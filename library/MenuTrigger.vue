<template>
  <div
    ref="wrapperRef"
    class="mx-menu-trigger"
    @mouseenter="onMouseEnter"
    @click="onTrigger('click', $event)"
  >
    <div ref="triggerRef" class="mx-menu-trigger-content">
      <slot />
    </div>
    <slot 
      name="menu" 
      :options="menuPos" 
      :show="visible" 
      :onClose="() => visible=false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue';
import type { MenuPopDirection } from './ContextMenuDefine';
import { getTop, getLeft } from './ContextMenuUtils';

const props = defineProps({
  trigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click',
  },
  position: {
    type: String as PropType<MenuPopDirection>,
    default: 'bl',
  },
  offset: {
    type: Number,
    default: 5,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['show', 'hide']);

const wrapperRef = ref<HTMLElement>();
const triggerRef = ref<HTMLElement>();
const visible = ref(false);
const menuPos = ref({ x: 0, y: 0 });

function calcPosition(): { x: number; y: number } {
  const el = triggerRef.value!;
  const pos = props.position;
  let x = 0, y = 0;

  if (pos.startsWith('b'))
    y = getTop(el) + el.offsetHeight + props.offset;
  else if (pos.startsWith('t'))
    y = getTop(el) - props.offset;
  else
    y = getTop(el) + el.offsetHeight / 2;

  if (pos.endsWith('l'))
    x = getLeft(el);
  else if (pos.endsWith('r'))
    x = getLeft(el) + el.offsetWidth;
  else
    x = getLeft(el) + el.offsetWidth / 2;

  return { x, y };
}

function showMenu() {
  if (props.disabled) return;
  const pos = calcPosition();
  menuPos.value = pos;
  visible.value = true;
  emit('show', pos);
}

function hideMenu() {
  visible.value = false;
  emit('hide');
}

function onTrigger(type: 'click', e: MouseEvent) {
  if (props.disabled) return;
  if (props.trigger !== type) return;

  if (type === 'click' && visible.value) {
    hideMenu();
  } else {
    showMenu();
  }
}

function onMouseEnter() {
  if (props.trigger !== 'hover') return;
  if (!visible.value) {
    showMenu();
  }
}

defineExpose({
  show: showMenu,
  hide: hideMenu,
});
</script>

<style>
.mx-menu-trigger {
  display: inline-block;
}
.mx-menu-trigger-content {
  display: inline-block;
}
</style>
