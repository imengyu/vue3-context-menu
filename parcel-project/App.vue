<script setup lang="js">
import ContextMenuGlobal from '@imengyu/vue3-context-menu'
import { ref } from 'vue';

function onContextMenu(e) {
  //prevent the browser's default menu
  e.preventDefault();
  //show your menu
  ContextMenuGlobal.showContextMenu({
    x: e.x,
    y: e.y,
    items: [
      { 
        label: "A menu item", 
        onClick: () => {
          onMenuClick("You click a menu item");
        }
      },
      { 
        label: "A submenu", 
        children: [
          { label: "Item1" },
          { label: "Item2" },
          { label: "Item3" },
        ]
      },
    ]
  });
}
function onMenuClick(n) {
  alert("You click a menu item" + n);
}

const optionsComponent = ref({
  zIndex: 3,
  minWidth: 230,
  x: 500,
  y: 200
});
const show = ref(false);

function onContextMenu2(e) {
  //prevent the browser's default menu
  e.preventDefault();
  //显示组件菜单
  show.value = true;
  optionsComponent.value.x = e.x;
  optionsComponent.value.y = e.y;
}
</script>

<template>
  <button @contextmenu="onContextMenu">Right click me to show context menu!</button>
  <button @contextmenu="onContextMenu2">Right click me to show context menu!</button>
  <context-menu
    v-model:show="show"
    :options="optionsComponent"
  >
    <context-menu-item label="Simple item" @click="onMenuClick(1)" />
    <context-menu-separator /><!--use this to add separator-->
    <context-menu-group label="Menu with child">
      <context-menu-item label="Item1" @click="onMenuClick(2)" />
      <context-menu-item label="Item2" @click="onMenuClick(3)" />
      <context-menu-group label="Child with v-for 50">
        <context-menu-item v-for="index of 50" :key="index" :label="'Item3-'+index" @click="onMenuClick(index)" />
      </context-menu-group>
    </context-menu-group>
  </context-menu>
</template>