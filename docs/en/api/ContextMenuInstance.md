---
title: Function mode

---

# Function mode

## ContextMenu

```ts
import ContextMenu from '@imengyu/vue3-context-menu'
```

Global Function

### `ContextMenu.showContextMenu(options: MenuOptions, customSlots?: Record<string, Slot>)`

  Show context menu.

  | Param | Description |
  | :----: | :----: |
  | options | The options of menu. |
  | customSlots | These slots to allow you to customize the style of the current menu, the names of these slots are the same as those in the [component mode](#ContextMenu). |

  Return

  | Type | Description |
  | :----: | :----: |
  | ContextMenuInstance | The instance of the current menu, can calling 'closeMenu' to close this menu. |

### `ContextMenu.closeContextMenu()`

  Manually close the currently open context menu.

### `this.$contextmenu`

  Same as `ContextMenu.showContextMenu` but this function is registered to vue global property.

### `ContextMenu.transformMenuPosition`

  If your `body` element is in a scaled state (e.g. `transform: scale(0.5)`), this may lead to the wrong position of the menu display.
  You can use this function to convert the correct menu display position:

  ```ts
  import ContextMenu from '@imengyu/vue3-context-menu'

  function onContextMenu(e: MouseEvent) {
    const scaledPosition = ContextMenu.transformMenuPosition(e.target as HTMLElement, e.offsetX, e.offsetY);
    //Full code of menuData is in `/examples/views/InScaledBody.vue`
    menuData.x = scaledPosition.x;
    menuData.y = scaledPosition.y;
    //show menu
    ContextMenu.showContextMenu(menuData);
  }
  ```

## MenuOptions

| Property | Description | Type | Optional value | Default |
| :----: | :----: | :----: | :----: | :----: |
| items | The items for this menu. | `MenuItem[]` | — | — |
| x | Menu display x position. | `number` | — | `0` |
| y | Menu display y position. | `number` | — | `0` |
| xOffset | X-coordinate offset of submenu and parent menu. | `number` | — | `0` |
| yOffset | Y-coordinate offset of submenu and parent menu. | `number` | — | `0` |
| iconFontClass | Custom icon library font class name. (global). Only for css font icon, If you use the svg icon, you do not need to use this. | `string` | — | `iconfont` |
| zIndex | The `z-index` of this menu | `number` | — | `2` |
| iconFontClass | Custom icon library font class name. | `string` | — | `iconfont` |
| preserveIconWidth | Should a fixed-width icon area be reserved for menu items without icon. | `boolean` | - | `true` |
| keyboardControl | Set whether the user can use keyboard keys to control the current menu. | `boolean` | — | `true` |
| theme | The [theme](../guide/theme.md) of this menu. | `string` | `'default' 'dark' 'flat' 'win10' 'mac'` | `default` |
| minWidth | Submenu minimum width (in pixels). | `number` | — | `100` |
| maxWidth | Submenu maximum width (in pixels). | `number` | — | `600` |
| adjustPadding | Padding for submenu position adjust. | `number` | — | `10` |
| adjustPosition | By default, the menu will automatically adjust its position to prevent it overflow the container. If you allow menu overflow containers, you can set this to false. | `boolean` | — | `true` |
| getContainer | Return the mounted node for MenuRoot. [Guide](../guide/custom-container.en.md) | `HTMLElement` or `(() => HTMLElement)` | — | — |
| onClose | This event emit when this menu is closing. (Usually used in function mode) | `(() => void)` | — | — |

## MenuItem

| Property | Description | Type | Optional value | Default |
| :----: | :----: | :----: | :----: | :----: |
| label | The label of menu. | `string` or `VNode` or `((label: string) => VNode)` | — | — |
| icon | The icon for menu item. | `string` or `VNode` or `((icon: string) => VNode)` | — | — |
| iconFontClass | Custom icon library font class name. | `string` | — | `iconfont` |
| preserveIconWidth | Should a fixed-width icon area be reserved for menu items without icon. | `boolean` | - | `true` |
| svgIcon | Display icons use svg symbol (`<use xlink:href="...">`) ， only valid when icon attribute is empty. | `string` | — | — |
| svgProps | The user-defined attribute of the svg tag, which is valid when using `svgIcon`. | `SVGAttributes` | — | — |
| disabled | Disable menu item? | `boolean` | — | `false` |
| hidden | Hide menu item? | `boolean` | — | `false` |
| checked | Is this menu item checked? | `boolean` | — | `false` |
| shortcut | Shortcut key text display on the right. The shortcut keys here are only for display. You need to handle the key events by yourself. | `string` | — | `''` |
| adjustSubMenuPosition | By default, the submenu will automatically adjust its position to prevent it overflow the container. If you allow menu overflow containers, you can set this to false. | `boolean` | — | inherit from `MenuOptions.adjustPosition` |
| clickableWhenHasChildren | When there are subitems in this item, is it allowed to trigger its own click event? | `boolean` | — | `false` |
| clickClose | Should close menu when Click this menu item ? | `boolean` | — | `true` |
| divided | Is this menu item separated from the menu item below? | `boolean` | — | `false` |
| customClass | Custom submenu class. | `string` | — | — |
| minWidth | Submenu minimum width (in pixels). | `number` | — | `100` |
| maxWidth | Submenu maximum width (in pixels). | `number` | — | `600` |
| onClick | Menu item click event handler. | `Function()` | — | — |
| onSubMenuClose | This event emit when submenu of this item is closing. | `(() => void)` | — | — |
| onSubMenuOpen | This event emit when submenu of this item is showing. | `(() => void)` | — | — |
| customRender | A custom render callback that allows you to customize the rendering of the current item. | `VNode` or `((item: MenuItemRenderData) => VNode)` | — | — |
| children | Submenu items. | `MenuItem[]` | — | — |
