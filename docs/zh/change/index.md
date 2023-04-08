---
title: 更新日志
nav:
  title: 更新日志
  order: 5
---

## v1.2.4 - 2023/4/8

* [Fix] 添加了 `MenuOptions.adjustPosition` 属性，以允许控制最外层菜单是否在溢出容器时自动调整位置 ([#34](https://github.com/imengyu/vue3-context-menu/issues/34))
* [Fix] 修复了在可滚动的长页面下菜单定位不正确问题 ([#34](https://github.com/imengyu/vue3-context-menu/issues/34))
* [Fix] 修改菜单项的 icon、label属性类型验证 (Thasks @kjellmf [#36](https://github.com/imengyu/vue3-context-menu/issues/36))

## v1.2.3 - 2023/2/15

* [Fix] 修改菜单组件导出与定义不一致的问题（1.2.0-1.2.2） ([#30](https://github.com/imengyu/vue3-context-menu/issues/30))

## v1.2.2 - 2023/1/29

* [Fix] 修改菜单错误拦截键盘事件的问题 ([#27](https://github.com/imengyu/vue3-context-menu/issues/27))

## v1.2.0 - 2023/1/28

* [Added] 添加了 `MenuItem.shortcut` 用于显示当前菜单项的快捷键提示。
* [Added] 添加了 `MenuItem.preserveIconWidth` 用于设置是否应为没有图标的菜单项保留固定宽度的图标区域。
* [Added] 添加了 `MenuItem.checked` 用于指定当前菜单项是否被打勾。
* [Added] 添加了新的三种[主题](../guide/theme.md)，抽离了CSS，提供了一些[CSS变量](../guide/customize.md#css变量)，允许你方便的修改颜色。支持自定义主题。
* [Fix] 修改全局菜单返回实例调用 closeMenu 无法关闭菜单的问题 ([#26](https://github.com/imengyu/vue3-context-menu/issues/26))
* [Changed] 菜单的样式重写，拆分至单独的 SCSS 中。
* [Changed] ⚠ 菜单的右箭头现在使用单独的 SVG 图片（之前是嵌入在css中的base64 data），如果你使用 `.mx-right-arrow` 样式自定义右箭头图片，需要特殊处理一下，隐藏svg。

## v1.1.9 - 2023/1/6

* 修改全局菜单插槽未正确传递丢失参数的问题 ([#25](https://github.com/imengyu/vue3-context-menu/issues/25))

## v1.1.8 - 2023/1/5

* 修改函数模式下 divide=true 的条目 设置 hidden 为 true 后分割线没有隐藏的问题 ([#24](https://github.com/imengyu/vue3-context-menu/issues/24))
* 修复了重复创建默认容器的问题 ([#24](https://github.com/imengyu/vue3-context-menu/issues/24))
* 文档修改。

## v1.1.7 - 2022/12/20

* [Added] 添加了 `MenuOptions.getContainer` 允许你自定义菜单所挂载的容器。 ([#17](https://github.com/imengyu/vue3-context-menu/issues/17), [#19](https://github.com/imengyu/vue3-context-menu/issues/19))
* [Added] 添加了 `MenuOptions.adjustPadding` 可设置菜单自动位置调整的边距。
* [Added] 添加了单独的文档站点，整理文档以让大家阅读更清晰。
* 修改了菜单自动调整位置不正确的问题.

## v1.1.6 - 2022/12/20

* [Added] 添加了 `MenuItem.hidden` 属性可动态控制函数模式下菜单项的显示和隐藏。 ([#20](https://github.com/imengyu/vue3-context-menu/issues/20))
* [Added] 添加了 `ContextMenu.transformMenuPosition` 函数，以解决缩放 body 时菜单位置不正确的问题。 ([#17](https://github.com/imengyu/vue3-context-menu/issues/17), [#19](https://github.com/imengyu/vue3-context-menu/issues/19))

## v1.1.5 - 2022/12/8

* 修复了获取窗口高度不正确，导致调整菜单高度不正确的问题。

## v1.1.4 - 2022/11/29

* 修复了 #16.

## v1.1.3 - 2022/11/28

* [Added] 添加子菜单打开状态数据：
  * 添加了 css `.mx-context-menu-item.open` 表示当前菜单的子菜单已打开。 ([#15](https://github.com/imengyu/vue3-context-menu/issues/15))
  * 在渲染插槽参数 (`MenuItemRenderData`) 添加了属性 `isOpen` 表示当前菜单的子菜单是否打开。
  * 在渲染插槽参数 (`MenuItemRenderData`) 添加了属性 `hasChildren` 指示当前菜单是否具有子菜单。
* [Added] 添加了svg图标支持。 (`svgIcon` 和 `svgProps` 属性).
* [Change] 子菜单打开时，父菜单现在将保持高亮显示。

## v1.1.2 - 2022/11/06

* 修复未正确删除绑定事件的问题。 ([#14](https://github.com/imengyu/vue3-context-menu/pull/14) Thanks @liumingye)

## v1.1.1 - 2022/09/05

* [Added] 添加了 `closeWhenScoll` 属性，用于控制滚动鼠标时是否关闭菜单。
* [Added] 添加了 `closeMenu` 实例函数用于关闭菜单。
* [Added] 添加了 `closeContextMenu` 全局函数，可用于关闭当前打开的菜单。
* 修复了在嵌套容器的情况下打开的菜单不会消失的问题。

## v1.1.0 - 2022/08/27

* [Added] 支持组件模式。
* [Added] 支持暗色主题。
* [Added] 支持自定义槽自定义菜单。

## v1.0.9 - 2022/01/14

* 添加 Composition API 全局函数 。
* 修复了单击空白位置关闭菜单的问题（[#2](https://github.com/imengyu/vue3-context-menu/issues/2）。
* 修复了单击禁用项目并仍然触发单击事件的问题（[#3](https://github.com/imengyu/vue3-context-menu/issues/3)）。

## 2021/07/25

正式发布。
