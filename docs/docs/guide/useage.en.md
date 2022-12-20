---
title: Usage
---

## Usage

It is recommended that you check the [examples source code](examples/) before use. It provides a variety of detailed usage methods, which may be very helpful to you. 😀

## Import

```js
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'

createApp(App).use(ContextMenu)     
```

## Show menu

There are two ways to display menus:

The first is the function mode. You can use  `this.$contextmenu` or `showContextMenu` global function displays a menu through menu data:

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

## Dynamic change menu in function mode

You only need to declare the menu data as responsive data, so that you can dynamically modify the menu:

```ts
const menuData = reactive<MenuOptions>({
  items: [
    { 
      label: 'Simple item',
      onClick: () => alert('Click Simple item'),
    },
  ]
});

ContextMenu.showContextMenu(menuData);

//You can change properties at any time after the menu is displayed:
menuData.items[0].label = 'My label CHANGED!'; //Change label
menuData.items[0].hidden = true; //Change hidden
```
