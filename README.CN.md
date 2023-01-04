
# vue3-context-menu

一个使用 Vue3 制作的简洁美观简单的右键菜单组件

![截图](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/first.png)

---

## 特性

* 简洁易用，体积小
* 提供组件模式和函数模式，调用方便
* 可自定义

### 用法

```
npm install -save @imengyu/vue3-context-menu
```

然后在 main.ts 中导入:

```js
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'

createApp(App).use(ContextMenu)     
```

然后你就可以在 vue 文件中使用菜单了:

```js
import ContextMenu from '@imengyu/vue3-context-menu'

onContextMenu(e : MouseEvent) {
  //prevent the browser's default menu
  e.preventDefault();
  //show your menu
  ContextMenu.showContextMenu({
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
}
```

关于详细的用法，请参考文档。

## 文档

[查看文档](https://imengyu.top/pages/vue3-context-menu-docs/)

[查看在线演示](https://imengyu.top/pages/vue3-context-menu-demo/)

## 开发

```shell
git clone git@github.com:imengyu/vue3-context-menu.git
cd vue3-context-menu
npm install
npm serve
```

## License

[MIT](./LICENSE)
