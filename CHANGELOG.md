# Changelog

## v1.1.8 - 2023/1/5

* Fix The Separator is not hidden when hidden is true. (#24)
* Fixed duplicate creation of default containers. (#24)

## v1.1.7 - 2022/12/20

* [Added] Added the `MenuOptions.getContainer` that you can mount menu to custom containers. (#17, #19)
* [Added] Added the `MenuOptions.adjustPadding` to set padding for submenu position adjust.
* Fixed the problem that adjust menu height incorrect.

## v1.1.6 - 2022/12/20

* [Added] Added the `MenuItem.hidden` property to dynamically control the display and hide of menu item in fuction mode. (#20)
* [Added] Added the `ContextMenu.transformMenuPosition` function to solve the problem that the menu position is incorrect when the body is zoomed. (#17, #19)

## v1.1.5 - 2022/12/8

* Fixed the problem that get window height is incorrect, which causes the adjust menu height incorrect.

## v1.1.4 - 2022/11/29

* Fixed #16.

## v1.1.3 - 2022/11/28

* [Added] Added the submenu open state.
  * Added the css `.mx-context-menu-item.open` indicates that the submenu of the current menu is open. (#15)
  * Added the property `isOpen` in render slot data (`MenuItemRenderData`) indicates that the submenu of the current menu is open.
  * Added the property `hasChildren` in render slot data (`MenuItemRenderData`) indicates whether the current menu has submenus.
* [Added] Added the svg icon support. (`svgIcon` and `svgProps` property).
* [Change] The parent menu will now remain highlighted when the submenu open.

## v1.1.2 - 2022/11/06

* Fix the problem that the binding event was not removed correctly. (#14 Thanks @liumingye)

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
* Fixed #2 that Click the blank position to close the menu.
* Fixed the issue (#3) that click the disabled item and still trigger the click event.

## 2021/07/25

Official release.
