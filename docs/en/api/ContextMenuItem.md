---
title: ContextMenuItem
---

# ContextMenuItem

Menu item component.

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
| clickClose | Should close menu when Click this menu item ? | `boolean` | `true` |
| customClass | Custom submenu class. | `string` | — |
| onClick | Menu item click event handler. | `Function()` | — |

## Slots

| Slot name | Description | Arguments |
| :----: | :----: | :----: |
| default | Rendering slot for the current menu | - |
| icon | Icon rendering slot | - |
| label | Label rendering slot | - |
| shortcut | Check mark render slot | MenuItemRenderData |
| check | Shortcut key badge render slot | MenuItemRenderData |
| rightArrow | Right Arrow rendering slot | - |

## Click

| Event name | Description | Arguments |
| :----: | :----: | :----: |
| click | This event is triggered when the click this menu item | - |
| subMenuOpen | Trigger this event when a submenu is opened | - |
| subMenuClose | Trigger this event when the submenu is closed | - |
