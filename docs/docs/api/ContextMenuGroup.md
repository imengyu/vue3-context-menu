---
title: ContextMenuGroup

---

# ContextMenuGroup

子菜单组件。

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
| adjustSubMenuPosition | 是否在子菜单超出屏幕后进行自动调整 | `boolean` | `true` |
| clickClose | 点击当前菜单项是否自动关闭整个菜单 | `boolean` | `true` |
| customClass | 自定义子菜单class | `string` | — |
| minWidth | 子菜单最小宽度 | `number` | `100` |
| maxWidth | 子菜单最大宽度 | `number` | `600` |
| onClick | 菜单项点击事件 | `Function()` | — |

## Slots

| 插槽名 | 描述 | 参数 |
| :----: | :----: | :----: |
| default | 子菜单渲染插槽 | - |
