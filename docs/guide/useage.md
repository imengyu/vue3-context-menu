---
title: 如何使用
order: 2
---

# 如何使用

## 显示菜单

显示菜单有两种方式：

第一种是函数模式，可以使用 `this.$contextmenu` 或者 `showContextMenu` 全局函数，通过菜单数据显示一个右键菜单：

```js
import ContextMenu from '@imengyu/vue3-context-menu'

onContextMenu(e : MouseEvent) {
  //prevent the browser's default menu
  e.preventDefault();
  //show your menu
  this.$contextmenu({
    x: e.x,
    y: e.y,
    items: [
      { 
        label: "A menu item", 
        onClick: () => {
          alert("You click a menu item");
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

  //这个函数与 this.$contextmenu 一致
  ContextMenu.showContextMenu({ ... }); 
}
```

> 注：`this.$contextmenu` 只能在模板或者选项式函数中使用。

第二种是组件模式，可以使用组件显示菜单：

```html
<context-menu
  v-model:show="show"
  :options="optionsComponent"
>
  <context-menu-item label="Simple item" @click="onMenuClick(1)" />
  <context-menu-sperator /><!--use this to add sperator-->
  <context-menu-group label="Menu with child">
    <context-menu-item label="Item1" @click="onMenuClick(2)" />
    <context-menu-item label="Item2" @click="onMenuClick(3)" />
    <context-menu-group label="Child with v-for 50">
      <context-menu-item v-for="index of 50" :key="index" :label="'Item3-'+index" @click="onLoopMenuClick(index)" />
    </context-menu-group>
  </context-menu-group>
</context-menu>
```

```js
data() {
  return {
    show: false,
    //For component
    optionsComponent: {
      zIndex: 3,
      minWidth: 230,
      x: 500,
      y: 200
    },
  }
},
methods: {
  onButtonClick(e : MouseEvent) {
    //显示组件菜单
    this.show = true;
    this.options.x = e.x;
    this.options.y = e.y;
  },
}
```

## 动态控制菜单

### 函数模式

你只需要将菜单数据声明为响应式数据，即可动态修改菜单：

```js
const menuData = reactive({
  items: [
    { 
      label: 'Simple item',
      onClick: () => alert('Click Simple item'),
    },
  ]
});

//也可以在函数模式下动态控制菜单
ContextMenu.showContextMenu(menuData);

//可以在显示菜单后随时更改属性：
menuData.items[0].label = 'My label CHANGED!'; //更改文本
menuData.items[0].hidden = true; //更改是否隐藏
```

### 组件模式

组件模式动态控制就更简单了，你可以使用 v-if 指令动态控制显示，也可以直接绑定菜单参数至变量上，更改就和普通组件一样。

下面的示例展示了组件模式下动态显示/隐藏菜单，动态修改菜单项文字：

```vue
<template>
  <context-menu
    v-model:show="show"
    :options="optionsComponent"
  >
    <context-menu-item label="Test item dynamic show and hide" :clickClose="false" @click="showItem=!showItem" />
    <context-menu-item v-if="showItem" label="Click the item above to show/hide me" />
    <context-menu-sperator v-if="showItem" />
    <context-menu-item :label="itemText" :clickClose="false" @click="changeLabelText" />
  </context-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { MenuOptions } from '@imengyu/vue3-context-menu';

export default defineComponent({
  data() {
    return {
      show: false,
      showItem: true,
      itemText: 'Test item dynamic change label',
      optionsComponent: {
        x: 500,
        y: 200
      } as MenuOptions,
    }
  },
  methods: {
    onContextMenu(e : MouseEvent) {
      e.preventDefault();
      //Set the mouse position
      this.optionsComponent.x = e.x;
      this.optionsComponent.y = e.y;
      //Show menu
      this.show = true;
    },
    changeLabelText() {
      this.itemText = (this.itemText == 'My label CHANGED!' ? 'Test item dynamic change label' : 'My label CHANGED!');
    },
  }
});
</script>
```

## 菜单栏

本库附带了一个菜单栏组件，因为右键菜单的功能和菜单栏非常相似，所以一并做到库里了，你也可以使用这个组件实现桌面程序的主菜单栏功能。

在线示例可以参考[这里](https://imengyu.top/pages/vue3-context-menu-demo/#/MenuBar)。

```vue
<template>
  <MenuBar :options="menuData" />
</template>

<script setup lang="ts">
import { MenuBar } from '@imengyu/vue3-context-menu';

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
  zIndex: 3,
  minWidth: 230,
};
</script>
```
