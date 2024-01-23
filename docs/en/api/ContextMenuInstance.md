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
  | customSlots | These slots to allow you to customize the style of the current menu, the names of these slots are the same as those in the [component mode](#ContextMenu). For customization methods, please refer in [here](../guide/customize.md). |

  Return

  | Type | Description |
  | :----: | :----: |
  | ContextMenuInstance | The instance of the current menu, can calling `closeMenu` to close this menu, calling `isClosed` to check if the menu is currently closed. |

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
| items | <div style="width:250px">The items for this menu.</div> | `MenuItem[]` | — | — |
| x | Menu display x position. | `number` | — | `0` |
| y | Menu display y position. | `number` | — | `0` |
| xOffset | X-coordinate offset of submenu and parent menu. | `number` | — | `0` |
| yOffset | Y-coordinate offset of submenu and parent menu. | `number` | — | `0` |
| iconFontClass | Custom icon library font class name. (global). Only for css font icon, If you use the svg icon, you do not need to use this. | `string` | — | `iconfont` |
| zIndex | The `z-index` of this menu | `number` | — | `2` |
| iconFontClass | Custom icon library font class name. | `string` | — | `iconfont` |
| preserveIconWidth | Should a fixed-width icon area be reserved for menu items without icon. | `boolean` | - | `true` |
| keyboardControl | Set whether the user can use keyboard keys to control the current menu. | `boolean` | — | `true` |
| closeWhenScroll | Set whether to close the menu when the user scrolls the mouse. | `boolean` | - | `true` |
| mouseScroll | Set whether users can use the mouse scroll wheel to scroll through long menus in the menu area. | `boolean` | — | `false` |
| theme | The [theme](../guide/theme.md) of this menu. | `string` | `'default' 'dark' 'flat' 'win10' 'mac'` | `default` |
| minWidth | Submenu minimum width (in pixels). | `number` or `string` | — | `100` |
| maxWidth | Submenu maximum width (in pixels). | `number` or `string` | — | `600` |
| adjustPadding | Padding for submenu position adjust. | `{ x: number, y: number }` or `number` | — | `{ x：0, y: 10 }` |
| adjustPosition | By default, the menu will automatically adjust its position to prevent it overflow the container. If you allow menu overflow containers, you can set this to false. | `boolean` | — | `true` |
| direction | Set the mian menu pop-up direction relative to coordinates. Default is `'br'`, if `adjustPosition` is true then the menu will determine the pop-up direction based on its distance from the screen edge. | `'br' or 'b' or 'bl' or 'tr' or 't' or 'tl' or 'l' or 'r'` | — | `'br'` |
| menuTransitionProps | The Vue Transition props used when menu show or hide. | `TransitionProps` | — |
| ignoreClickClassName | If your element in menu item has this className, click it will ignore event. | `string` | — |
| clickCloseOnOutside | Set should close menu when the user click on other places. | `boolean` | — | `true` |
| clickCloseClassName | If your element in menu item has this className, click it will ignore event and close hole menu. | `string` | — |
| updownButtonSpaceholder | Determine whether the up/down buttons in the menu item require space holder. The purpose of this variable is because some menu themes add blank padding above and below the menu, which are just enough to place up/down buttons. If there is no blank padding in your custom menu theme, you can set this field to provide blank space for up/down buttons to prevent obscuring menu items. | `boolean` | — | `false` |
| getContainer | Return the mounted node for MenuRoot. [Guide](../guide/custom-container.md) | `HTMLElement` or `(() => HTMLElement)` | — | — |
| onClose | This event emit when this menu is closing. (Usually used in function mode). Param lastClickItem The last clicked menu item, if user does not click any item, it is `undefined`. This param only valid in function mode. | `((lastClickItem: MenuItem|undefined) => void)` | — | — |

## MenuItem

| Property | Description | Type | Optional value | Default |
| :----: | :----: | :----: | :----: | :----: |
| label | <div style="width:300px">The label of menu.</div> | `string` or `VNode` or `((label: string) => VNode)` | — | — |
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
| divided | Should show Separator?<ul><li>`true` or `'down'`: Separator is show below menu.</li><li> `'up'`: Separator is show above menu.</li><li> `'self'`: Mark this item is a Separator.</li><li> `false`: No Separator. </li></ul> | `boolean` or `'up'` or `'down'` or `'self'` | — | `false` |`boolean` | — | `false` |
| customClass | Custom submenu class. | `string` | — | — |
| minWidth | Submenu minimum width (in pixels). | `number` or `string` | — | `100` |
| maxWidth | Submenu maximum width (in pixels). | `number` or `string` | — | `600` |
| direction | Set the submenu pop-up direction relative to coordinates. Default is inherted from `MenuOptions.direction`, if `adjustSubMenuPosition` is true then the submenu will determine the pop-up direction based on its distance from the screen edge. | `'br' or 'b' or 'bl' or 'tr' or 't' or 'tl' or 'l' or 'r'` | — | inherit from `MenuOptions.direction` |
| onClick | Menu item click event handler. | `Function()` | — | — |
| onSubMenuClose | This event emit when submenu of this item is closing. | `(() => void)` | — | — |
| onSubMenuOpen | This event emit when submenu of this item is showing. | `(() => void)` | — | — |
| customRender | A custom render callback that allows you to customize the rendering of the current item. | `VNode` or `((item: MenuItemRenderData) => VNode)` | — | — |
| children | Submenu items. | `MenuItem[]` | — | — |
