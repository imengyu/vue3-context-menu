---
title: 更新日志
nav:
  title: 更新日志
  order: 5
---

## v1.3.9 - 2024/03/16

* [Fix] 修改 `padding-right` 为 `padding-inline-end`，以更好地支持RTL模式 (Thanks @hooray, [#83](https://github.com/imengyu/vue3-context-menu/pull/83))

## v1.3.8 - 2024/02/04

* [Added] 添加 `MenuBarOptions.barPopDirection` 属性用于控制菜单栏一级子菜单弹出方向。
* [Fix] 修复 VNodeRender 的类型告警。

## v1.3.7 - 2024/01/23

* [Added] 添加 `MenuOptions.menuTransitionProps` 属性用于实现菜单显示/隐藏的过度动效。 ([#80](https://github.com/imengyu/vue3-context-menu/issues/80))

## v1.3.6 - 2024/01/17

* [Added] 添加 `isClosed` 实例方法用于检查当前菜单实例是否已经关闭。 ([#77](https://github.com/imengyu/vue3-context-menu/issues/77))
* [Added] 添加 `clickCloseOnOutside` 选项允许配置用户点击外部是否关闭菜单。 ([#76](https://github.com/imengyu/vue3-context-menu/issues/76))
* [Fix] 修复 VNodeRenderer 发出的类型警告。
* [Docs] 添加 `--mx-menu-open-hover-background` 和 `--mx-menu-open-hover-text` 的说明。(Thanks @croatialu)
* [Docs] 修改拼写 (Thanks @cheqianxiao)

## v1.3.4 - 2023/12/13

* [Added] 添加了 `MenuOptions.mouseScroll` 来定义是否可以用滚轮来滚动长菜单。
* [Added] 允许在上下按钮上使用滚轮来滚动长菜单。Thanks @jonathanzuniga ([#56](https://github.com/imengyu/vue3-context-menu/issues/56)).
* [Fix] 修复长菜单条目显示不完全问题。
* [Fix] 修复了自定义挂载容器添加zIndex的问题。
* [Fix] 修复了菜单溢出容器问题。

## v1.3.1 - 2023/07/23

* [Added] 在函数模式下的 onClose 回调中添加了触发关闭的菜单项参数，用于获取用户点击了哪个菜单项关闭了菜单。 ([#55](https://github.com/imengyu/vue3-context-menu/issues/55)).
* [Fix] 修复 MenuBar 弹出菜单位置不正确问题。 ([#54](https://github.com/imengyu/vue3-context-menu/issues/54)).

## v1.3.1 - 2023/07/12

* [Added] `MenuItem.divider` 添加了 `'up'|'down'|'self'` 选项用于控制分割线方向。

## v1.3.0 - 2023/06/20

* [Added] 添加了 `MenuOptions.direction` 和 `MenuItem.direction` 允许控制菜单弹出方向。
* [Added] 添加了 `clickCloseClassName` 和 `clickCloseClassName` 用于忽略某些自定义子元素的点击事件 ([#48](https://github.com/imengyu/vue3-context-menu/issues/48))
* [Added] 在渲染插槽参数中添加了 `close` 回调用于关闭整个菜单。
* [Change] `MenuOptions.adjustPadding` 默认值修改为 `{ x：0, y: 10 }`.
* [Change] 菜单溢出调整已经更改，现在菜单不会溢出屏幕
* [Fix] 修复菜单限制最大宽度后文字溢出显示问题。
* [Fix] 修复菜单在过窄的页面中溢出问题 ([#49](https://github.com/imengyu/vue3-context-menu/issues/49))
* [Fix] 修复 closeWhenScroll 在移动端上不工作的问题 ([#47](https://github.com/imengyu/vue3-context-menu/issues/47))
* [Fix] 修复数字类型的minWidth和maxWidth无效的问题 ([#46](https://github.com/imengyu/vue3-context-menu/issues/46))

## v1.2.10 - 2023/05/27

* [Fix] 修复onClick回调中的 this 指向错误
* [Fix] 修复 win10 主题丢失问题

## v1.2.7 - 2023/05/27

* [Added] 新增了 MenuBar 菜单栏组件。
* [Fix] 使用Teleport渲染菜单，修复插槽相关数据不正常问题 ([#45](https://github.com/imengyu/vue3-context-menu/issues/45))

## v1.2.6 - 2023/4/29

* [Added] 为函数模式添加了 `onClose`（菜单关闭）、`onSubMenuOpen`（子菜单打开）、`onSubMenuClose`（子菜单关闭） 事件回调。([#41](https://github.com/imengyu/vue3-context-menu/issues/41))
* [Added] 新增了两个css变量： `--mx-menu-open-hover-backgroud`（菜单项打开并且鼠标悬浮时背景颜色）、`--mx-menu-open-hover-text`（菜单项打开并且鼠标悬浮时文字颜色）
* [Changed] 修改了 mac 和 win10.light 两个主题的显示效果。

## v1.2.5 - 2023/4/9

* [Fix] 修复了 1.2.4 丢失 .d.ts 文件的问题 ([#38](https://github.com/imengyu/vue3-context-menu/issues/38))

## v1.2.4 - 2023/4/8

* [Fix] 添加了 `MenuOptions.adjustPosition` 属性，以允许控制最外层菜单是否在溢出容器时自动调整位置 ([#34](https://github.com/imengyu/vue3-context-menu/issues/34))
* [Fix] 修复了在可滚动的长页面下菜单定位不正确问题 (Thasks @jamespltan [#35](https://github.com/imengyu/vue3-context-menu/pull/35)) ([#34](https://github.com/imengyu/vue3-context-menu/issues/34))
* [Fix] 修改菜单项的 icon、label属性类型验证 (Thasks @kjellmf [#36](https://github.com/imengyu/vue3-context-menu/pull/36))

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
