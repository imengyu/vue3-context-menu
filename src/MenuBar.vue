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
        @click="onItemClick(key, item)"
        @mouseenter="onItemEnter(key, item)"
      >
        {{ item.label }}
      </div>
    </div>
    <slot name="suffix" />
  </div>
</template>

<script lang="ts">
import { ref, PropType, defineComponent, onMounted, watch } from 'vue';
import { MenuBarOptions } from './MenuBar';
import { ContextMenuInstance, MenuItem } from './ContextMenuDefine';
import { getTop, getLeft } from './ContextMenuUtils';
import ContextMenu from './ContextMenuInstance';
import MenuBarIconMenu from './MenuBarIconMenu.vue';

/**
 * Menu bar component
 */
export default defineComponent({
  name: 'MenuBar',
  emits: [],
  props: {
    /**
     * Menu options
     */
    options: {
      type: Object as PropType<MenuBarOptions>,
      default: null
    },
  },
  components: {
    MenuBarIconMenu,
  },
  setup(props, ctx) {
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
      menuItems.value = props.options.items || [];
    });
    watch(() => props.options, () => {
      menuItems.value = props.options.items || [];
    });

    let currentMenu : ContextMenuInstance|null = null;
    let currentMenuIndex = -1;

    function showNextSubMenu() {
      if (currentMenuIndex < menuItems.value.length - 1)
        currentMenuIndex++;
      else 
        currentMenuIndex = 0;
      showSubMenu(currentMenuIndex, menuItems.value[currentMenuIndex]);
    }
    function showPrevSubMenu() {
      if (currentMenuIndex > 0)
        currentMenuIndex--;
      else 
        currentMenuIndex = menuItems.value.length - 1;
      showSubMenu(currentMenuIndex, menuItems.value[currentMenuIndex]);
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
      menuActive.value = item;
      const ele = menuBarContent.value?.children[index] as HTMLElement;
      if (ele) {
        currentMenu = ContextMenu.showContextMenu({
          ...props.options,
          items: item.children,
          x: getLeft(ele),
          y: getTop(ele) + ele.offsetHeight,
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
        currentMenu = ContextMenu.showContextMenu({
          ...props.options,
          x: getLeft(ele),
          y: getTop(ele) + ele.offsetHeight,
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

    return {
      menuItems,
      menuActive,
      menuBarContent,
      menuBarActive,
      onFocus,
      onBlur,
      onItemClick,
      onItemEnter,
    };
  }
});

</script>

<style lang="scss">
@import './MenuBar.scss';
</style>