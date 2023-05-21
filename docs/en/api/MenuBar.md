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
| prefix | 菜单栏前部渲染插槽 | - |
| suffix | 菜单栏后部渲染插槽 | - |

## MenuBarOptions

| Property | Description | Type |
| :----: | :----: | :----: |
| mini | Set whether the current menu bar is collapsed, default is false. | `boolean` |
| ... | All other parameters inherit from [MenuOptions](./ContextMenuInstance.md#menuoptions) | - |
