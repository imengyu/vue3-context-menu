# Changelog

## v1.1.3 - 2022/11/28

* [Added] Added the submenu open state.
  * Added the css `.mx-context-menu-item.open` indicates that the submenu of the current menu is open.
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
