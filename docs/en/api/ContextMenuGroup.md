---
title: ContextMenuGroup
---

# ContextMenuGroup

Submenu component.

## Props

| Property | Description | Type | Default |
| :----: | :----: | :----: | :----: |
| label | The label of menu. | `string` | — |
| icon | The icon for menu item. | `string` | — |
| iconFontClass | Custom icon library font class name. | `string` | — | `iconfont` |
| preserveIconWidth | Should a fixed-width icon area be reserved for menu items without icon. | `boolean` | - | `true` |
| svgIcon | Display icons use svg symbol (`<use xlink:href="...">`) ， only valid when icon attribute is empty. | `string` | — | — |
| svgProps | The user-defined attribute of the svg tag, which is valid when using `svgIcon`. | `SVGAttributes` | — | — |
| disabled | Disable menu item? | `boolean` | `false` |
| checked | Is this menu item checked? | `boolean` | — | `false` |
| shortcut | Shortcut key text display on the right. The shortcut keys here are only for display. You need to handle the key events by yourself. | `string` | — | `''` |
| clickableWhenHasChildren | When there are subitems in this item, is it allowed to trigger its own click event? | `boolean` | `false` |
| adjustSubMenuPosition | By default, the submenu will automatically adjust its position to prevent it overflow the container. If you allow menu overflow containers, you can set this to false. | `boolean` | inherit from `MenuOptions.adjustPosition` |
| clickClose | Should close menu when Click this menu item ? | `boolean` | `true` |
| customClass | Custom submenu class. | `string` | — |
| minWidth | Submenu minimum width (in pixels). | `number` | `100` |
| maxWidth | Submenu maximum width (in pixels). | `number` | `600` |
| onClick | Menu item click event handler. | `Function()` | — |

## Slots

| Slot name | Description | Arguments |
| :----: | :----: | :----: |
| default | Submenu render slot | - |
