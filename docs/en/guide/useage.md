---
title: Usage
order: 1
---

# Usage

It is recommended that you check the [examples source code](https://github.com/imengyu/vue3-context-menu/tree/main/examples/views) before use. It provides a variety of detailed usage methods, which may be very helpful to you. 😀

## Import

```js
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'

createApp(App).use(ContextMenu)     
```

## Show menu

There are two ways to display menus:

The first is the function mode. You can use  `this.$contextmenu` or `showContextMenu` global function displays a menu with menu data:

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

  //Same as this.$contextmenu
  ContextMenu.showContextMenu({ ... }); 
}
```

> Note: `this.$contextmenu` can only be used in templates or optional api.

The second is the component mode. You can use the component and template to display the menu:

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
    //Show component mode menu
    this.show = true;
    this.options.x = e.x;
    this.options.y = e.y;
  },
}
```

## Dynamic change menu

You only need to declare the menu data as responsive data, so that you can dynamically modify the menu:

### Function mode

```js
const menuData = reactive({
  items: [
    { 
      label: 'Simple item',
      onClick: () => alert('Click Simple item'),
    },
  ]
});

//Use in function mode
ContextMenu.showContextMenu(menuData);

//You can change properties at any time after the menu is displayed:
menuData.items[0].label = 'My label CHANGED!'; //Change label
menuData.items[0].hidden = true; //Change hidden
```

### Component mode

The dynamic control of component mode is simpler. You can use the `v-if` directive to dynamically control the display, or you can directly bind menu parameters to variables. The changes are just like normal components.

The following example shows how to dynamically display/hide menus and dynamically modify menu item text in component mode:

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
```
