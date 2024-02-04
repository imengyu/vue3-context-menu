<template>
  <div 
    :class="[ 
      'mx-menu-bar',
      options.theme ?? '',
      options.mini ? 'mini' : '',
    ]"
    @focus="onFocus"
    @blur="onBlur"
  >
    <slot name="prefix" />
    
    <div 
      v-if="options.mini"
      ref="menuBarContent"
      class="mx-menu-bar-content"
    >
      <div 
        class="mx-menu-bar-item"
        @click="onItemClick(0, null)"
      >
        <MenuBarIconMenu />
      </div>
    </div>
    <div 
      v-else
      ref="menuBarContent"
      class="mx-menu-bar-content"
    >
      <div 
        v-for="(item, key) in menuItems" 
        :key="key"
        :class="[
          'mx-menu-bar-item',
          item == menuActive ? 'active' : '',
        ]"
        @click="onItemClick(key, item as MenuItem)"
        @mouseenter="onItemEnter(key, item as MenuItem)"
      >
        {{ item.label }}
      </div>
    </div>
    <slot name="suffix" />
  </div>
</template>

<script setup lang="ts">
/**
 * Menu bar component
 */
import { ref, type PropType, onMounted, watch } from 'vue';
import type { MenuBarOptions } from './MenuBar';
import type { ContextMenuInstance, MenuItem } from './ContextMenuDefine';
import { getTop, getLeft } from './ContextMenuUtils';
import ContextMenu from './ContextMenuInstance';
import MenuBarIconMenu from './MenuBarIconMenu.vue';

const props = defineProps({
  /**
   * Menu options
   */
  options: {
    type: Object as PropType<MenuBarOptions>,
    default: null
  }
});

const menuBarContent = ref<HTMLDivElement>();
const menuBarActive = ref(false);
const menuItems = ref<MenuItem[]>([]);
const menuActive = ref<MenuItem|null>(null);

function onFocus() {
  menuBarActive.value = true;
}
function onBlur() {
  menuBarActive.value = false;
}

onMounted(() => {
  (menuItems.value as MenuItem[]) = props.options.items || [];
});
watch(() => props.options, () => {
  (menuItems.value as MenuItem[]) = props.options.items || [];
});

let currentMenu : ContextMenuInstance|null = null;
let currentMenuIndex = -1;

function showNextSubMenu() {
  if (currentMenuIndex < menuItems.value.length - 1)
    currentMenuIndex++;
  else 
    currentMenuIndex = 0;
  showSubMenu(currentMenuIndex, menuItems.value[currentMenuIndex] as MenuItem);
}
function showPrevSubMenu() {
  if (currentMenuIndex > 0)
    currentMenuIndex--;
  else 
    currentMenuIndex = menuItems.value.length - 1;
  showSubMenu(currentMenuIndex, menuItems.value[currentMenuIndex] as MenuItem);
}
function getMenuShowPos(ele: HTMLElement) {
  const showDirection = props.options.barPopDirection ?? 'bl';
  let x = 0; 
  let y = 0;
  if (showDirection.startsWith('b'))
    y = getTop(ele) + ele.offsetHeight;
  else if (showDirection.startsWith('t'))
    y = getTop(ele);
  else 
    y = getTop(ele) + ele.offsetHeight / 2;

  if (showDirection.endsWith('l'))
    x = getLeft(ele);
  else if (showDirection.startsWith('r'))
    x = getLeft(ele) + ele.offsetWidth;
  else 
    x = getLeft(ele) + ele.offsetWidth / 2;

  return { x, y }
}
function showSubMenu(index: number, item: MenuItem) {
  currentMenuIndex = index;
  if (!item.children)
    return;
  if (currentMenu) {
    currentMenu.closeMenu();
    currentMenu = null;
    menuBarActive.value = true;
  }
  (menuActive.value as MenuItem) = item;
  const ele = menuBarContent.value?.children[index] as HTMLElement;
  if (ele) {
    const { x, y } = getMenuShowPos(ele);

    currentMenu = ContextMenu.showContextMenu({
      ...props.options,
      items: item.children,
      x,
      y,
      onKeyFocusMoveLeft() {
        showPrevSubMenu();
      },
      onKeyFocusMoveRight() {
        showNextSubMenu();
      },
      onClose() {
        if (menuActive.value == item) {
          menuBarActive.value = false;
          menuActive.value = null;
        }
      },
    });
  }
}
function showAllSubMenu() {
  currentMenuIndex = 0;
  const ele = menuBarContent.value as HTMLElement;
  if (ele) {
    const { x, y } = getMenuShowPos(ele);
    currentMenu = ContextMenu.showContextMenu({
      ...props.options,
      x,
      y,
    });
  }
}

function onItemClick(index: number, item: MenuItem|null) {
  if (item) {
    menuBarActive.value = true;
    showSubMenu(index, item);
    if (
      item.onClick && (
      (item.clickableWhenHasChildren === true && item.children && item.children.length > 0)
      || !item.children || item.children.length === 0)
    )
      item.onClick();
  } else {
    showAllSubMenu();
  }
}
function onItemEnter(index: number, item: MenuItem) {
  if (menuBarActive.value) {
    showSubMenu(index, item);
  }
}

</script>

<style lang="scss">
@import './MenuBar.scss';
</style>