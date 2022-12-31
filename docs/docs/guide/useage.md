---
title: 如何使用
order: 2
---

## 导入组件

```js
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'

createApp(App).use(ContextMenu)     
```

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

第二种是组件模式，可以使用vue组件显示菜单：

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

## 在函数模式下动态控制菜单

你只需要将菜单数据声明为响应式数据，即可动态修改菜单：

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

//可以在显示菜单后随时更改属性：
menuData.items[0].label = 'My label CHANGED!'; //更改文本
menuData.items[0].hidden = true; //更改是否隐藏
```
