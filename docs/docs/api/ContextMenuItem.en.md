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
| svgIcon | Display icons use svg symbol (`<use xlink:href="...">`) ， only valid when icon attribute is empty. | `string` | — | — |
| svgProps | The user-defined attribute of the svg tag, which is valid when using `svgIcon`. | `SVGAttributes` | — | — |
| disabled | Disable menu item? | `boolean` | `false` |
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
| rightArrow | Right Arrow rendering slot | - |

## Click

| Event name | Description | Arguments |
| :----: | :----: | :----: |
| click | This event is triggered when the click this menu item | - |
