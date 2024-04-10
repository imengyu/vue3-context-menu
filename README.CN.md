
# vue3-context-menu

一个使用 Vue3 制作的简洁美观简单的右键菜单组件

![截图](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/first.png)

---

## 特性

* 简洁易用，体积小
* 提供组件模式和函数模式，调用方便
* 提供多个菜单主题供您使用
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

[查看文档](https://docs.imengyu.top/vue3-context-menu-docs/)

[查看在线演示](https://docs.imengyu.top/vue3-context-menu-demo/)

## 已有主题

|theme|explain|example image|
|--|--|--|
|`default`|Default theme|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-default.jpg)|
|`default dark`|Default theme with dark|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-default-dark.jpg)|
|`flat`|Simple flat theme|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-flat.jpg)|
|`flat dark`|Simple flat theme with dark|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-flat-dark.jpg)|
|`win10`|Win10 like theme|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-win10.jpg)|
|`win10 dark`|Win10 like theme with dark|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-win10-dark.jpg)|
|`mac`|Mac like theme|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-mac.jpg)|
|`mac dark`|Mac like theme with dark|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-mac-dark.jpg)|

## 广告: 作者其他的有用项目

* [vue-code-layout A Vue editor layout component that like VSCode](https://github.com/imengyu/vue-code-layout)
* [vue-dock-layout A Vue editor layout component that like Visual Studio](https://github.com/imengyu/vue-dock-layout)
* [vue-dynamic-form A data driven form component for vue3](https://github.com/imengyu/vue-dynamic-form)

## 开发

```shell
git clone git@github.com:imengyu/vue3-context-menu.git
cd vue3-context-menu
npm install
npm run dev # Development serve project
npm run build-demo # Build example project
npm run build-lib # Build library project
```

## License

[MIT](./LICENSE)
