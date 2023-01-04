---
title: ContextMenuItem
---

# ContextMenuItem

菜单条目组件。

## Props

| 属性 | 描述 | 类型 | 默认值 |
| :----: | :----: | :----: | :----: |
| label | 菜单项名称 | `string` | — |
| icon | 菜单项图标 | `string` | — |
| iconFontClass | 自定义图标字体类名 | `string` | — | `iconfont` |
| svgIcon | 菜单项图标 svg，仅在 icon 为空时有效 | `string` | — | — |
| svgProps | 当使用 svg 图标时，自定义 svg 标签属性 | `SVGAttributes` | — | — |
| disabled | 是否禁用菜单项 | `boolean` | `false` |
| clickableWhenHasChildren | 指定当本菜单下有子菜单时，点击当前菜单是否触发点击事件 | `boolean` | `false` |
| clickClose | 点击当前菜单项是否自动关闭整个菜单 | `boolean` | `true` |
| customClass | 自定义子菜单class | `string` | — |
| onClick | 菜单项点击事件 | `Function()` | — |

## Slots

| 插槽名 | 描述 | 参数 |
| :----: | :----: | :----: |
| default | 当前条目整体渲染插槽 | - |
| icon | 图标渲染插槽 | - |
| label | 文字渲染插槽 | - |
| rightArrow | 右侧箭头渲染插槽 | - |

## Click

| 事件名 | 描述 | 参数 |
| :----: | :----: | :----: |
| click | 点击菜单时触发此事件 | - |