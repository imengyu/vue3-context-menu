---
title: Changelog
nav:
  title: Changelog
  order: 5
---

## v1.2.4 - 2023/4/8

* [Fix] Added the `MenuOptions.adjustPosition` attribute to allow control over whether the toplevel menu automatically adjusts its position when overflowing the container ([#34](https://github.com/imengyu/vue3-context-menu/issues/34))
* [Fix] Add Function as valid prop type to label and icon (Thasks @kjellmf [#36](https://github.com/imengyu/vue3-context-menu/issues/36))

## v1.2.3 - 2023/2/15

* [Fix] Fix the inconsistency between menu component export and definition (1.2.0-1.2.2) ([#30](https://github.com/imengyu/vue3-context-menu/issues/30))

## v1.2.2 - 2023/1/29

* [Fix] Fix the problem that the menu incorrectly intercepts all keyboard events ([#27](https://github.com/imengyu/vue3-context-menu/issues/27))

## v1.2.0 - 2023/1/28

* [Added] Added `MenuItem.shortcut` to display the shortcut key badge of the current menu item.
* [Added] Added `MenuItem.preserveIconWidth` to set whether a fixed-width icon area should be reserved for menu items without icons.
* [Added] Added `MenuItem.checked` to specify whether the current menu item is checked.
* [Added] Added three new [theme](../guide/theme.md) extracted CSS and provided some [CSS variables](../guide/customize.md#css-variables), allowing you to modify the color conveniently. Custom themes are supported.
* [Fix] Fix the problem that global function return instance call `closeMenu` cant close the menu ([#26](https://github.com/imengyu/vue3-context-menu/issues/26)).
* [Changed] ⚠ The right arrow of the menu now uses a SVG image (before is base64 data embedded in css). If you use the `.mx-right-arrow` style to customize the right arrow image, you need to do special processing to hide the SVG.

## v1.1.9 - 2023/1/6

* Fix global slot missing problem ([#25](https://github.com/imengyu/vue3-context-menu/issues/25))

## v1.1.8 - 2023/1/5

* Fix The Separator is not hidden when hidden is true. ([#24](https://github.com/imengyu/vue3-context-menu/issues/24))
* Fixed duplicate creation of default containers. ([#24](https://github.com/imengyu/vue3-context-menu/issues/24))

## v1.1.7 - 2022/12/20

* [Added] Added the `MenuOptions.getContainer` that you can mount menu to custom containers. ([#17](https://github.com/imengyu/vue3-context-menu/issues/17), [#19](https://github.com/imengyu/vue3-context-menu/issues/19))
* [Added] Added the `MenuOptions.adjustPadding` to set padding for submenu position adjust.
* [Added] A document site has been added to make reading clearer.
* Fixed the problem that adjust menu height incorrect.

## v1.1.6 - 2022/12/20

* [Added] Added the `MenuItem.hidden` property to dynamically control the display and hide of menu item in fuction mode. ([#20](https://github.com/imengyu/vue3-context-menu/issues/20))
* [Added] Added the `ContextMenu.transformMenuPosition` function to solve the problem that the menu position is incorrect when the body is zoomed. ([#17](https://github.com/imengyu/vue3-context-menu/issues/17), [#19](https://github.com/imengyu/vue3-context-menu/issues/19))

## v1.1.5 - 2022/12/8

* Fixed the problem that get window height is incorrect, which causes the adjust menu height incorrect.

## v1.1.4 - 2022/11/29

* Fixed #16.

## v1.1.3 - 2022/11/28

* [Added] Added the submenu open state.
  * Added the css `.mx-context-menu-item.open` indicates that the submenu of the current menu is open. ([#15](https://github.com/imengyu/vue3-context-menu/issues/15))
  * Added the property `isOpen` in render slot data (`MenuItemRenderData`) indicates that the submenu of the current menu is open.
  * Added the property `hasChildren` in render slot data (`MenuItemRenderData`) indicates whether the current menu has submenus.
* [Added] Added the svg icon support. (`svgIcon` and `svgProps` property).
* [Change] The parent menu will now remain highlighted when the submenu open.

## v1.1.2 - 2022/11/06

* Fix the problem that the binding event was not removed correctly. ([#14](https://github.com/imengyu/vue3-context-menu/pull/14) Thanks @liumingye)

## v1.1.1 - 2022/09/05

* [Added] Added the `closeWhenScoll` attribute, which is used to control whether to close the menu when scrolling the mouse.
* [Added] Added the `closeMenu` instance function to close menu.
* [Added] Added the `closeContextMenu` global function, which can be used to close the currently open menu.
* Fixed the problem that the open menu would not disappear in the case of nested containers.

## v1.1.0 - 2022/08/27

* [Added] Support component mode.
* [Added] Support dark theme.
* [Added] Support custom slot to customize menu.

## v1.0.9 - 2022/01/14

* Add a global function for Composition API.
* Fixed [#2](https://github.com/imengyu/vue3-context-menu/issues/2) that Click the blank position to close the menu.
* Fixed the issue ([#3](https://github.com/imengyu/vue3-context-menu/issues/3)) that click the disabled item and still trigger the click event.

## 2021/07/25

Official release.
