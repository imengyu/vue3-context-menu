---
title: Install
order: 0
---

# Install

```shell
npm install -save @imengyu/vue3-context-menu
```

vue3-context-menu only supports Vue3. If you are using Vue2, you can try the following library.

* [xunleif2e/vue-context-menu](https://github.com/xunleif2e/vue-context-menu)
* [GitHub-Laziji/menujs](https://github.com/GitHub-Laziji/menujs) (This library is inspired by it)

## Global import

It is recommended that you import components globally for the most convenient use.

```js
//main.js
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'

createApp(App).use(ContextMenu).mount('#app')  
```

## Local Registration

First import the style file:

```js
//main.js
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
```

Then import components where you need to use them:

```vue
<template>
  <div @contextmenu="onContextMenu($event)">
    Right click to show contextmenu !
  </div>
  <!--this is component mode of context-menu-->
  <context-menu
    v-model:show="show"
    :options="optionsComponent"
  >
    <context-menu-item label="Simple item" @click="alertContextMenuItemClicked('Item1')" />
    <context-menu-item label="Item with a icon" icon="icon-reload-1" @click="alertContextMenuItemClicked('Item2')" />
    <context-menu-sperator />
    <context-menu-group label="Menu with child">
      <context-menu-item label="Item1" @click="alertContextMenuItemClicked('Item2-1')" />
      <context-menu-item label="Item1" @click="alertContextMenuItemClicked('Item2-2')" />
      <context-menu-group label="Child with v-for 50">
        <context-menu-item v-for="index of 50" :key="index" :label="'Item3-'+index" @click="alertContextMenuItemClicked('Item3-' + index)" />
      </context-menu-group>
    </context-menu-group>
  </context-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { type MenuOptions, ContextMenu, ContextMenuGroup, ContextMenuSeparator, ContextMenuItem } from '@imengyu/vue3-context-menu';

export default defineComponent({
  data() {
    return {
      show: false,
      optionsComponent: {
        iconFontClass: 'iconfont',
        customClass: "class-a",
        zIndex: 3,
        minWidth: 230,
        x: 500,
        y: 200
      } as MenuOptions,
    }
  },
  components: {
    ContextMenu,
    ContextMenuGroup,
    ContextMenuSeparator,
    ContextMenuItem,
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
    alertContextMenuItemClicked(name: string) {
      alert('You clicked ' + name + ' !');
    },
  }
});
</script>
```

## Getting Started

[Getting Started](./useage.md)

## Other questions

### How to use menu components in global build of Vue single page

In Vue files that use single page applications without using vite, webpack or other packaging tools, you need to change the import.

You need to import these two files in html. The files can be found in the lib directory of the npm package.

* vue3-context-menu.umd.js
* vue3-context-menu.css

Register menu components:

```js
createApp(...)
  .use(window['vue3-context-menu'].default)
```

After registration, it can be used as a normal project. The following is a complete case:

```html
<!--examples\single-test.html-->
<html>
  <head>
    <title>vue3-context-menu test</title>
    <link rel="stylesheet" href="./vue3-context-menu.css" />
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="./vue3-context-menu.umd.js"></script>
  </head>
  <body>
    <div id="app">
      <div @contextmenu="onContextMenu($event)">{{ message }}</div>
    </div>
    <script>
      const { createApp } = Vue

      createApp({
        data() {
          return {
            message: 'Right click here to show contextmenu !'
          }
        },
        methods: {
          onContextMenu(e) {
            //prevent the browser's default menu
            e.preventDefault();
            //show our menu
            this.$contextmenu({
              items: [
                { 
                  label: 'Simple item',
                  onClick: () => alert('Click Simple item'),
                },
                {
                  label: "Sub menu Example",
                  children: [
                    {
                      label: "Back",
                      onClick: () => {
                        console.log("You click Back");
                      }
                    },
                    { label: "Forward", disabled: true },
                    { 
                      label: "Reload", 
                      divided: true, 
                      icon: "icon-reload-1",
                      onClick: () => {
                        alert("You click Reload");
                      }
                    },
                    { 
                      label: "Save as...",
                      icon: "icon-save",
                      onClick: () => {
                        alert("You click Save as");
                      }
                    },
                    { 
                      label: "Print...", 
                      icon: "icon-print",
                      onClick: () => {
                        alert("You click Print");
                      } 
                    },
                    { label: "View source", icon: "icon-terminal" },
                    { label: "Inspect" }
                  ],
                },
              ],
              iconFontClass: 'iconfont',
              customClass: "class-a",
              zIndex: 3,
              minWidth: 230,
              x: e.x,
              y: e.y,
            });
          }
        },  
      })
      .use(window['vue3-context-menu'].default)
      .mount('#app')
    </script>
  </body>
</html>
```

### Modify and register global '$contextmenu' function and component names

If you find that the default name of the library menu conflicts with the name of the library component you have used during global import, you can manually register and modify the default name:

```js
//main.js
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css';
import ContextMenuGlobal, { ContextMenu, ContextMenuGroup, ContextMenuSeparator, ContextMenuItem } from '@imengyu/vue3-context-menu';

const app = createApp(App);

//Do not use the default registration function
//app.use(ContextMenu)

//Customize the name of a component
app.component('my-context-menu', ContextMenu)
app.component('my-context-menu-group', ContextMenuGroup)
app.component('my-context-menu-separator', ContextMenuSeparator)
app.component('my-context-menu-item', ContextMenuItem)
  
//Modify global '$contextmenu' function name
app.config.globalProperties.$mycontextmenu = ContextMenuGlobal.showContextMenu;

app.mount('#app')  
```
