
vue3-context-menu
---
A context menu for Vue3

![Screenshot](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/first.png)

[中文说明](https://github.com/imengyu/vue3-context-menu/blob/main/README.CN.md)

---

[View Demo](https://imengyu.top/pages/vue3-context-menu-demo/)

---

### Install

```
npm install -save @imengyu/vue3-context-menu
```

### Useage

Import vue3-context-menu in main.js:
```js
import ContextMenu from 'vue3-context-menu'

createApp(App)
  .use(ContextMenu)     
```

Add events to the elements that you want show contextmenu: 
```html
<div class="box" @contextmenu="onContextMenu($event)">
  Right click to show contextmenu.
</div>
```

Then show your menu:
```js
onContextMenu(e : MouseEvent) {
  //prevent the browser's default menu
  e.preventDefault();
  //shou our menu
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
}
```

### Parameter description

#### MenuOptions

| Attribute | description | type | optional value | default value|
| :----: | :----: | :----: | :----: | :----: |
| items | The items for this menu. | `MenuItem[]` | — | — |
| x | Menu display x position. | `number` | — | `0` |
| y | Menu display y position. | `number` | — | `0` |
| xOffset | X-coordinate offset of submenu and parent menu. | `number` | — | `0` |
| yOffset | Y-coordinate offset of submenu and parent menu. | `number` | — | `0` |
| iconFontClass | Custom icon library font class name. | `string` | — | `iconfont` |
| zIndex | The z-index of this menu. | `number` | — | `2` |
| customClass | Custom menu class. | `string` | — | — |
| minWidth | Minimum width of main menu (in pixels) | `number` | — | `100` |
| maxWidth | Maximum width of main menu (in pixels) | `number` | — | `600` |

#### MenuItem

| Attribute | description | type | optional value | default value|
| :----: | :----: | :----: | :----: | :----: |
| label | The label of menu. | `string` | — | — |
| icon | The icon for menu item. | `string` | — | — |
| disabled | Disable menu item? | `boolean` | — | `false` |
| divided | Is this menu item separated from the menu item below? | `boolean` | — | `false` |
| customClass | Custom submenu class. | `string` | — | — |
| minWidth | Submenu minimum width (in pixels). | `number` | — | `100` |
| maxWidth | Submenu maximum width (in pixels). | `number` | — | `600` |
| onClick | Menu item click event handler. | `Function()` | — | — |
| children | Submenu items. | `MenuItem[]` | — | — |
