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
| preserveIconWidth | 是否应为没有图标的菜单项保留固定宽度的图标区域 | `boolean` | - | `true` |
| svgIcon | 菜单项图标 svg，仅在 icon 为空时有效 | `string` | — | — |
| svgProps | 当使用 svg 图标时，自定义 svg 标签属性 | `SVGAttributes` | — | — |
| disabled | 是否禁用菜单项 | `boolean` | `false` |
| checked | 是否选中菜单项 | `boolean` | — | `false` |
| shortcut | 当前菜单项的快捷键指示，此快捷键只用于显示给用户看，快捷键的注册还是需要你自己处理 | `string` | — | `''` |
| clickableWhenHasChildren | 指定当本菜单下有子菜单时，点击当前菜单是否触发点击事件 | `boolean` | `false` |
| adjustSubMenuPosition | 默认情况下，子菜单将自动调整其位置，以防止溢出容器。如果允许菜单溢出容器，可以将其设置为false | `boolean` | 继承自 `MenuOptions.adjustPosition` |
| clickClose | 点击当前菜单项是否自动关闭整个菜单 | `boolean` | `true` |
| customClass | 自定义子菜单class | `string` | — |
| minWidth | 子菜单最小宽度 | `number` | `100` |
| maxWidth | 子菜单最大宽度 | `number` | `600` |
| onClick | 菜单项点击事件 | `Function()` | — |

## Slots

| 插槽名 | 描述 | 参数 |
| :----: | :----: | :----: |
| default | 子菜单渲染插槽 | - |
