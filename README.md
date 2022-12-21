
vue3-context-menu
---
A context menu component for Vue3

![Screenshot](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/first.png)

English | [简体中文](https://github.com/imengyu/vue3-context-menu/blob/main/README.CN.md)

---

## Features

* Simple and easy to use, small size
* Provide component mode and function mode
* Customizable

### Useage

```
npm install -save @imengyu/vue3-context-menu
```

Then import in the main.ts file:

```js
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'

createApp(App).use(ContextMenu)     
```

Then you can use the ContextMenu in the .vue file:

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

## Documentation

[View Documentation](http://vue3-context-menu-docs.imengyu.top/en)

[Click here View online Demo](https://imengyu.top/pages/vue3-context-menu-demo/)

## Development

```shell
git clone git@github.com:imengyu/vue3-context-menu.git
cd vue3-context-menu
npm install
npm serve
```

## License

[MIT](./LICENSE)
