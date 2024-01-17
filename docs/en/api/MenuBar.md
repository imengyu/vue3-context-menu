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

| Property | Description | Type |
| :----: | :----: | :----: |
| mini | Set whether the current menu bar is collapsed, default is false. | `boolean` |
| ... | All other parameters inherit from [MenuOptions](./ContextMenuInstance.md#menuoptions) | - |
