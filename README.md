
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

## Documentation

[View Documentation](https://imengyu.top/pages/vue3-context-menu-docs/en/)

[Click here View online Demo](https://imengyu.top/pages/vue3-context-menu-demo/)

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

Or component:

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

## Development

```shell
git clone git@github.com:imengyu/vue3-context-menu.git
cd vue3-context-menu
npm install
npm serve
```

## License

[MIT](./LICENSE)
