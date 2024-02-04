---
title: MenuBar
nav:
  title: API参考
  order: 3
---

# MenuBar

菜单栏组件。

## Props

| 属性 | 描述 | 类型 | 默认值 |
| :----: | :----: | :----: | :----: |
| options | 菜单相关定义 | [`MenuBarOptions`](#menubaroptions) | — |

## Slots

| 插槽名 | 描述 | 参数 |
| :----: | :----: | :----: |
| prefix | 菜单栏前部渲染插槽 | - |
| suffix | 菜单栏后部渲染插槽 | - |

## MenuBarOptions

| 属性名 | 描述 | 类型 | 默认值 |
| :----: | :----: | :----: | :----: |
| mini | 指定当前菜单是否是迷你折叠模式 | `boolean` | `false` |
| barPopDirection | 控制菜单栏一级子菜单弹出方向 | `MenuPopDirection` | `'bl'` |
| ... | 其他参数均继承自 [MenuOptions](./ContextMenuInstance.md#menuoptions) | - | - |
