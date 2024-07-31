<template>
  <div class="mx-menu-ghost-host">
    <Transition
      v-if="options.menuTransitionProps"
      appear
      v-bind="options.menuTransitionProps"
      @after-leave="emit('closeAnimFinished')"
    >
      <ContextSubMenuConstructor
        v-if="show"
        ref="submenuInstance"
        class="mx-menu-host"
        :items="options.items"
        :adjustPosition="options.adjustPosition"
        :maxWidth="options.maxWidth || MenuConstOptions.defaultMaxWidth"
        :minWidth="options.minWidth || MenuConstOptions.defaultMinWidth"
        :direction="(options.direction || MenuConstOptions.defaultDirection as MenuPopDirection)"
      >
        <slot />
      </ContextSubMenuConstructor>
    </Transition>
    <ContextSubMenuConstructor
      v-else-if="show"
      ref="submenuInstance"
      class="mx-menu-host"
      :items="options.items"
      :adjustPosition="options.adjustPosition"
      :maxWidth="options.maxWidth || MenuConstOptions.defaultMaxWidth"
      :minWidth="options.minWidth || MenuConstOptions.defaultMinWidth"
      :direction="(options.direction || MenuConstOptions.defaultDirection as MenuPopDirection)"
    >
      <slot />
    </ContextSubMenuConstructor>
  </div>
</template>

<script setup lang="ts">
import { h, onBeforeUnmount, onMounted, type PropType, provide, ref, renderSlot, toRefs, type VNode, watch, Transition, useSlots, type Ref } from 'vue'
import type { ContextMenuInstance, ContextSubMenuInstance, MenuItem, MenuOptions, MenuPopDirection } from './ContextMenuDefine'
import { MenuConstOptions } from './ContextMenuDefine'
import { addOpenedContextMenu, removeOpenedContextMenu } from './ContextMenuMutex';
import ContextSubMenuConstructor, { type SubMenuContext, type SubMenuParentContext } from './ContextSubMenu.vue';

/**
 * Context menu component
 */

export type GlobalHasSlot = (name: string) => boolean;
export type GlobalRenderSlot = (name: string, params: Record<string, unknown>) => VNode;

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
    type: Object as PropType<Ref<boolean>>,
    default: null
  },
  /**
   * Current container, For calculation only
   */
  container: {
    type: Object as PropType<HTMLElement>,
    default: null
  },
  /**
   * Make sure is user set the custom container.
   */
  isFullScreenContainer: {
    type: Boolean,
    default: true
  },
});

const emit = defineEmits([ 'close', 'closeAnimFinished' ]);

const slots = useSlots()

const submenuInstance = ref<ContextSubMenuInstance>();

const {
  options,
  show,
  container,
} = toRefs(props);

onMounted(() => {
  if (show.value)
    openMenu();
})
onBeforeUnmount(() => {
  removeBodyEvents();
});

watch(show, (v: boolean) => {
  if(v) {
    openMenu();
  } else {
    removeOpenedContextMenu(instance);
    removeBodyEvents();
  }
});

const instance : ContextMenuInstance = {
  closeMenu,
  isClosed,
  getMenuRef: () => submenuInstance.value,
  getMenuDimensions: () => submenuInstance.value?.getMenuDimensions() ?? { width: 0, height: 0 },
};
let closed = false;

function openMenu() {
  installBodyEvents();
  addOpenedContextMenu(instance);
}
function closeMenu(fromItem?: MenuItem|undefined) {
  closed = true;
  emit("close", fromItem);
  if (!options.value.menuTransitionProps)
    emit('closeAnimFinished');
  removeOpenedContextMenu(instance);
}
function isClosed() {
  return closed;
}


function installBodyEvents() {
  setTimeout(() => {
    document.addEventListener("click", onBodyClick, true);
    document.addEventListener("contextmenu", onBodyClick, true);
    document.addEventListener("scroll", onBodyScroll, true);
    if (!props.isFullScreenContainer && container.value)
      container.value.addEventListener("scroll", onBodyScroll, true);
    if (options.value.keyboardControl !== false)
      document.addEventListener('keydown', onMenuKeyDown);
  }, 50);
}
function removeBodyEvents() {
  document.removeEventListener("contextmenu", onBodyClick, true);
  document.removeEventListener("click", onBodyClick, true);
  document.removeEventListener("scroll", onBodyScroll, true);
  if (!props.isFullScreenContainer && container.value)
    container.value.removeEventListener("scroll", onBodyScroll, true);
  if (options.value.keyboardControl !== false)
    document.removeEventListener('keydown', onMenuKeyDown);
}

//For keyboard event, remember which submenu is active
const currentOpenedMenu = ref<SubMenuContext|null>();
provide('globalSetCurrentSubMenu', (menu: SubMenuContext|null) => currentOpenedMenu.value = menu);

function onMenuKeyDown(e: KeyboardEvent) {
  let handled = true;
  //Handle keyboard event
  switch(e.key) {
    case "Escape": {
      if (currentOpenedMenu.value?.isTopLevel() === false) {
        currentOpenedMenu.value?.closeCurrentSubMenu();
      } else {
        closeMenu();
      }
      break;
    }
    case "ArrowDown":
      currentOpenedMenu.value?.moveCurrentItemDown();
      break;
    case "ArrowUp":
      currentOpenedMenu.value?.moveCurrentItemUp();
      break;
    case "Home":
      currentOpenedMenu.value?.moveCurrentItemFirst();
      break;
    case "End":
      currentOpenedMenu.value?.moveCurrentItemLast();
      break;
    case "ArrowLeft": {
      if (!currentOpenedMenu.value?.closeSelfAndActiveParent())
        options.value.onKeyFocusMoveLeft?.();
      break;
    }
    case "ArrowRight":
      if (!currentOpenedMenu.value?.openCurrentItemSubMenu())
        options.value.onKeyFocusMoveRight?.();
      break;
    case "Enter":
      currentOpenedMenu.value?.triggerCurrentItemClick(e);
      break;
    default:
      handled = false;
      break;
  }
  if (handled && currentOpenedMenu.value) {
    e.stopPropagation();
    e.preventDefault();
  }
}
function onBodyScroll() {
  //close when docunment scroll
  if (options.value.closeWhenScroll !== false)
    closeMenu();
}
function onBodyClick(e: MouseEvent) {
  checkTargetAndClose(e.target as HTMLElement, e);
}
function checkTargetAndClose(target: HTMLElement, e: MouseEvent) {
  //Loop target , Check whether the currently clicked element belongs to the current menu.
  // If yes, it will not be closed
  while (target) {
    if (target.classList && target.classList.contains('mx-menu-host'))
      return;
    target = target.parentNode as HTMLElement;
  }
  if (options.value.clickCloseOnOutside !== false) {
    //Close menu
    removeBodyEvents();
    closeMenu();
  } else {
    options.value.onClickOnOutside?.(e);
  }
}

//provide globalOptions for child use
provide('globalOptions', options);
provide('globalCloseMenu', closeMenu);
provide('globalIsFullScreenContainer', props.isFullScreenContainer);
//check slot exists
provide('globalHasSlot', (name: string) => {
  return slots[name] !== undefined;
});
//render slot
provide('globalRenderSlot', (name: string, params: Record<string, unknown>) => {
  return renderSlot(slots, name, { ...params }, () => [ h('span', 'Render slot failed') ], false);
});
//provide menuContext for child use
provide('menuContext', {
  zIndex: options.value.zIndex || MenuConstOptions.defaultZindex,
  container: container.value as unknown as HTMLElement,
  adjustPadding: { x: 0, y: 0 },
  getParentAbsY: () => options.value.x,
  getParentAbsX: () => options.value.y,
  getZoom: () => options.value.zoom || MenuConstOptions.defaultZoom,
  getParentX: () => 0,
  getParentY: () => 0,
  getParentWidth: () => 0,
  getParentHeight: () => 0,
  getPositon: () => [options.value.x,options.value.y],
  closeOtherSubMenuWithTimeOut: () => {/* Do nothing */},
  checkCloseOtherSubMenuTimeOut: () => false,
  addOpenedSubMenu: () => {/* Do nothing */},
  closeOtherSubMenu: () => {/* Do nothing */},
  getParentContext: () => null,
  getSubMenuInstanceContext: () => null,
  getElement: () => null,
  addChildMenuItem: () => {/* Do nothing */},
  removeChildMenuItem: () => {/* Do nothing */},
  markActiveMenuItem: () => {/* Do nothing */},
  markThisOpenedByKeyBoard: () => {/* Do nothing */},
  isOpenedByKeyBoardFlag: () => false,
  isMenuItemDataCollectedFlag: () => false,
} as SubMenuParentContext);

//Expose instance function
defineExpose(instance);
</script>

<style>
.mx-menu-ghost-host {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  overflow: hidden;
  pointer-events: none;
}
.mx-menu-ghost-host.fullscreen {
  position: fixed;
}
</style>
