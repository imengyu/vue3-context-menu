<template>
  <Teleport :to="`#${eleId}`">
    <ContextSubMenuWrapperConstructor
      ref="menuRef"
      :options="options"
      :show="show"
      :destroyOnClose="destroyOnClose"
      :container="container"
      :isFullScreenContainer="!isNew"
      @close="onClose"
    >
      <template v-for="(_, name) in slots" v-slot:[name]="data">
        <slot :name="name" v-bind="data"/>
      </template>
    </ContextSubMenuWrapperConstructor>
  </Teleport>
</template>

<script setup lang="ts">
import { toRefs, ref, useSlots } from 'vue'
import type { PropType, VNode } from 'vue'
import type { ContextMenuInstance, MenuOptions } from './ContextMenuDefine'
import { genContainer } from "./ContextMenuUtils";
import ContextSubMenuWrapperConstructor from './ContextSubMenuWrapper.vue'

export type GlobalHasSlot = (name: string) => boolean;
export type GlobalRenderSlot = (name: string, params: Record<string, unknown>) => VNode;

/**
 * Context menu component
 */

const emit = defineEmits([ 'update:show', 'close' ]);
const props = defineProps({
  /**
   * Menu options
   */
  options: {
    type: Object as PropType<MenuOptions>,
    default: null
  },
  /**
   * Show menu?
   */
  show: {
    type: Boolean,
    default: false
  },
  /**
   * Should the menu be destroyed when it is closed?
   */
  destroyOnClose: {
    type: Boolean,
    default: true
  },
})

const { options, show, destroyOnClose } = toRefs(props);
const { isNew, container, eleId } = genContainer(options.value);

const menuRef = ref<ContextMenuInstance | null>(null);
const slots = useSlots() as any;

function onClose(fromItem: undefined) {
  emit('update:show', false);
  emit('close');
  options.value.onClose?.(fromItem);
}

defineExpose({
  closeMenu: () => emit('update:show', false),
  isClosed: () => !show.value,
  getMenuRef: () => menuRef.value?.getMenuRef(),
  getMenuDimensions: () => menuRef.value?.getMenuDimensions() ?? { width: 0, height: 0 },
});


</script>
