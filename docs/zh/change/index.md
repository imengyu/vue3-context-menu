---
title: 更新日志
nav:
  title: 更新日志
  order: 5
---

## v1.1.8 - 2023/1/5

* 修改函数模式下 divide=true 的条目 设置 hidden 为 true 后分割线没有隐藏的问题 (#24)
* 修复了重复创建默认容器的问题 (#24)
* 文档修改。

## v1.1.7 - 2022/12/20

* [Added] 添加了 `MenuOptions.getContainer` 允许你自定义菜单所挂载的容器。 (#17, #19)
* [Added] 添加了 `MenuOptions.adjustPadding` 可设置菜单自动位置调整的边距。
* [Added] 添加了单独的文档站点，整理文档以让大家阅读更清晰。
* 修改了菜单自动调整位置不正确的问题.

## v1.1.6 - 2022/12/20

* [Added] 添加了 `MenuItem.hidden` 属性可动态控制函数模式下菜单项的显示和隐藏。 (#20)
* [Added]添加了 `ContextMenu.transformMenuPosition` 函数，以解决缩放 body 时菜单位置不正确的问题。 (#17, #19)

## v1.1.5 - 2022/12/8

* 修复了获取窗口高度不正确，导致调整菜单高度不正确的问题。

## v1.1.4 - 2022/11/29

* 修复了 #16.

## v1.1.3 - 2022/11/28

* [Added] 添加子菜单打开状态数据：
  * 添加了 css `.mx-context-menu-item.open` 表示当前菜单的子菜单已打开。 (#15)
  * 在渲染插槽参数 (`MenuItemRenderData`) 添加了属性 `isOpen` 表示当前菜单的子菜单是否打开。
  * 在渲染插槽参数 (`MenuItemRenderData`) 添加了属性 `hasChildren` 指示当前菜单是否具有子菜单。
* [Added] 添加了svg图标支持。 (`svgIcon` 和 `svgProps` 属性).
* [Change] 子菜单打开时，父菜单现在将保持高亮显示。

## v1.1.2 - 2022/11/06

* 修复未正确删除绑定事件的问题。 (#14 Thanks @liumingye)

## v1.1.1 - 2022/09/05

* [Added] 添加了 `closeWhenScoll` 属性，用于控制滚动鼠标时是否关闭菜单。
* [Added] 添加了`closeMenu` 实例函数用于关闭菜单。
* [Added] 添加了 `closeContextMenu` 全局函数，可用于关闭当前打开的菜单。
* 修复了在嵌套容器的情况下打开的菜单不会消失的问题。

## v1.1.0 - 2022/08/27

* [Added] 支持组件模式。
* [Added] 支持暗色主题。
* [Added] 支持自定义槽自定义菜单。

## v1.0.9 - 2022/01/14

* 添加 Composition API 全局函数 。
* 修复了单击空白位置关闭菜单的问题（#2）。
* 修复了单击禁用项目并仍然触发单击事件的问题（#3）。

## 2021/07/25

正式发布。
