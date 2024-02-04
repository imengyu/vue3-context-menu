---
title: MenuBar
---

# MenuBar

Menu bar component.

## Props

| Attribute | Description | Type | Default |
| :----: | :----: | :----: | :----: |
| options | Menu options | [`MenuBarOptions`](#menubaroptions) | — |

## Slots

| Slot name | Description | Arguments |
| :----: | :----: | :----: |
| prefix | Rendering slot in front of menu bar | - |
| suffix | The rendering slot behind the menu bar | - |

## MenuBarOptions

| Property | Description | Type | Default |
| :----: | :----: | :----: | :----: |
| mini | Set whether the current menu bar is collapsed, default is false. | `boolean` | `false` |
| barPopDirection | 控制菜单栏一级子菜单弹出方向 | `MenuPopDirection` | `'bl'` |
| ... | All other parameters inherit from [MenuOptions](./ContextMenuInstance.md#menuoptions) | - | - |

