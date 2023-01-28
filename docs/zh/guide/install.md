---
title: 安装
---

# 安装

```shell
npm install -save @imengyu/vue3-context-menu
```

vue3-context-menu 仅支持 Vue3，如果你在使用 Vue2，可以试试下面的库。

* [xunleif2e/vue-context-menu](https://github.com/xunleif2e/vue-context-menu)
* [GitHub-Laziji/menujs](https://github.com/GitHub-Laziji/menujs) (本库就是启发自它)

## 全局导入组件

建议你全局导入组件，这样使用最方便。

```js
//main.js
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'

createApp(App).use(ContextMenu).mount('#app')  
```

## 局部导入组件

首先导入样式文件：

```js
//main.js
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
```

然后在你需要使用的地方导入组件使用：

```vue
<script lang="ts">
import { defineComponent } from 'vue'

//导入组件
import { ContextMenu, ContextMenuGroup, ContextMenuSeparator, ContextMenuItem } from '@imengyu/vue3-context-menu';

export default defineComponent({
  //注册组件
  components: {
    ContextMenu,
    ContextMenuGroup,
    ContextMenuSeparator,
    ContextMenuItem,
  },
  //省略其他代码
});
</script>
```

## 开始使用

安装完成后您就可以 [开始使用](./useage.md) 了。

## 其他问题

### 如何在 CDN 引用的单页应用中使用菜单组件

在不使用脚手架等打包工具下，使用单页应用的 Vue 文件中，你需要修改下导入方式，用法与使用脚手架情况下一致。

你需要在html中引入这两个文件，文件可以在 npm 包的 lib 目录下找到。

* vue3-context-menu.umd.js
* vue3-context-menu.css

注册菜单组件：

```js
createApp(...)
  .use(window['vue3-context-menu'].default)
```

注册后即可像正常项目一样使用了。下方是一个完整案例：

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

### 修改注册全局 `$contextmenu` 函数和组件名称

如果你在全局导入的时候，发现本库菜单默认的名称与你已使用的库组件名称冲突，你可以手动注册，修改默认的名称：

```js
//main.js
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css';
import ContextMenuGlobal, { ContextMenu, ContextMenuGroup, ContextMenuSeparator, ContextMenuItem } from '@imengyu/vue3-context-menu';

const app = createApp(App);

//取消默认注册的函数
//app.use(ContextMenu)

//重新指定注册组件的名称
app.component('my-context-menu', ContextMenu)
app.component('my-context-menu-group', ContextMenuGroup)
app.component('my-context-menu-separator', ContextMenuSeparator)
app.component('my-context-menu-item', ContextMenuItem)
  
//重新注册挂载到 Vue 全局上的 $contextmenu 函数。
app.config.globalProperties.$mycontextmenu = ContextMenuGlobal.showContextMenu;

app.mount('#app')  
```
