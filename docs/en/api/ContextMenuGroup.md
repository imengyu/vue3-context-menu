---
title: ContextMenuGroup
---

# ContextMenuGroup

Submenu component.

## Props

| Property | Description | Type | Default |
| :----: | :----: | :----: | :----: |
| label | The label of menu. | `string` | — |
| icon | The icon for menu item. | `string` | — |
| iconFontClass | Custom icon library font class name. | `string` | `iconfont` |
| preserveIconWidth | Should a fixed-width icon area be reserved for menu items without icon. | `boolean` | `true` |
| svgIcon | Display icons use svg symbol (`<use xlink:href="...">`) ， only valid when icon attribute is empty. | `string` | — |
| svgProps | The user-defined attribute of the svg tag, which is valid when using `svgIcon`. | `SVGAttributes` | — |
| disabled | Disable menu item? | `boolean` | `false` |
| checked | Is this menu item checked? | `boolean`  | `false` |
| shortcut | Shortcut key text display on the right. The shortcut keys here are only for display. You need to handle the key events by yourself. | `string` | `''` |
| clickableWhenHasChildren | When there are subitems in this item, is it allowed to trigger its own click event? | `boolean` | `false` |
| adjustSubMenuPosition | By default, the submenu will automatically adjust its position to prevent it overflow the container. If you allow menu overflow containers, you can set this to false. | `boolean` | inherit from `MenuOptions.adjustPosition` |
| clickClose | Should close menu when Click this menu item ? | `boolean` | `true` |
| customClass | Custom submenu class. | `string` | — |
| minWidth | Submenu minimum width (in pixels). | `number` | `100` |
| maxWidth | Submenu maximum width (in pixels). | `number` | `600` |
| onClick | Menu item click event handler. | `Function()` | — |

## Slots

| Slot name | Description | Arguments |
| :----: | :----: | :----: |
| default | Submenu render slot | - |

## ContextMenuGroupRef

### `getSubMenuRef(): ContextSubMenuInstance`

  Get ContextSubMenuInstance of this group

  Returns

  | Explain |
  | :----: |
  | [`ContextSubMenuInstance`](#contextsubmenuinstance) 。 |

### `getMenuItemRef(): MenuItemContext`

  Get MenuItemContext of this item.

  Returns

  | Explain |
  | :----: |
  | [`MenuItemContext`](./ContextMenuItem.md#menuitemcontext)。 |

## ContextSubMenuInstance

Define that Submenu holder component exposed props. Use it to control more complex controls of the menu, including getting menu items, getting height, position, scrolling, setting scroll values, position, and more.

Can get by `ContextMenuInstance.getMenuRef`.

### `getSubmenuRoot(): HTMLElement`

  Get Root element of this submenu.

### `getMenu(): HTMLElement`

  Get Inner container element of this submenu.

### `getChildItem(index: number) : MenuItemContext | undefined`

  Get child menu item by array index, Only after the parent submenu is displayed can the child items be retrieved.

  Param

  | Param | Explain |
  | :----: | :----: |
  | index | Array index |

  Rturns

  | Explain |
  | :----: |
  | You can obtain control instance [MenuItemContext](./ContextMenuItem.md#menuitemcontext) according to the index to control menu items. |

### `getMenuDimensions(): { width: number, height: number }`

  Get submenu root element size.

  Returns

  | Explain |
  | :----: |
  | Return root menu size in pixel, return all zero if menu is not showing. |

### `getScrollValue(): number`

  Get submenu current scroll value (same as element.scrollTop).

### `getScrollHeight(): number`

  Get submenu max scroll height (same as element.scrollHeight).

### `getMaxHeight(): number`

  Get max submenu height.

### `getPosition(): { width: number, height: number }`

  Get submenu current position (Relative to the parent item).

### `setScrollValue(v: number): void`

  Set submenu current scroll value (same as element.scrollTop).

  Param

  | Param | Explain |
  | :----: | :----: |
  | v | element.scrollTop |

### `setPosition(x: number, y: number): void`

  Set submenu current position (Relative to the parent item).

  Param

  | Param | Explain |
  | :----: | :----: |
  | x | X position |
  | y | Y position |
