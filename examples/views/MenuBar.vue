<template>
  <div style="margin-left:150px;">
    <h3>MenuBar:</h3>
    <MenuBar :options="menuData">
    </MenuBar>
    <MenuBar :options="menuData2">
    </MenuBar>
    <MenuBar :options="menuData3">
    </MenuBar>
    <MenuBar :options="menuData4">
    </MenuBar>
    <MenuBar :options="menuData5">
    </MenuBar>
    <MenuBar :options="menuData6">
    </MenuBar>
    <h3>Collapsed MenuBar:</h3>
    <MenuBar :options="menuData7">
    </MenuBar>
    <MenuBar :options="menuData8">
    </MenuBar>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { MenuOptions } from '../../library/ContextMenuDefine';
import type { MenuBarOptions } from '../../library/MenuBar';
import MenuBar from '../../library/MenuBar.vue';

const menuData : MenuBarOptions = {
  items: [
    {
      label: "File",
      children: [
        { label: "New" },
        { label: "Open" },
        { 
          label: "Open recent",
          children: [
            { label: "File 1...." },
            { label: "File 2...." },
            { label: "File 3...." },
            { label: "File 4...." },
            { label: "File 5...." },
          ],
        },
        { label: "Save", divided: true },
        { label: "Save as..." },
        { label: "Close" },
        { label: "Exit" },
      ],
    },
    {
      label: "Edit",
      children: [
        { label: "Undo" },
        { label: "Redo" },
        { label: "Cut", divided: true },
        { label: "Copy" },
        { label: "Find", divided: true },
        { label: "Replace" },
      ],
    },
    {
      label: "View",
      children: [
        { label: "Zoom in" },
        { label: "Zoom out" },
        { label: "Reset zoom" },
        { label: "Full screent", divided: true },
        { label: "Find", divided: true },
        { label: "Replace" },
      ],
    },
    {
      label: "Help",
      children: [
        { label: "About" },
      ],
    },
  ],
  iconFontClass: 'iconfont',
  customClass: "class-a",
  zIndex: 3,
  minWidth: 230,
};
const menuData2 = {
  ...menuData,
  theme: 'dark',
};
const menuData3 = {
  ...menuData,
  theme: 'flat',
};
const menuData4 = {
  ...menuData,
  theme: 'flat dark',
};
const menuData5 = {
  ...menuData,
  theme: 'mac',
};
const menuData6 = {
  ...menuData,
  theme: 'mac dark',
};

const menuData7 = {
  ...menuData,
  mini: true,
};
const menuData8 = {
  ...menuData,
  mini: true,
  theme: 'dark',
};
</script>