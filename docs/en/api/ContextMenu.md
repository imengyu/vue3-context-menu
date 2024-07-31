---
title: ContextMenu
nav:
  title: API Reference
  order: 3
---

# ContextMenu

Menu component.

## Props

| Attribute | Description | Type | Default |
| :----: | :----: | :----: | :----: |
| show(v-model) | Controls whether the menu is displayed | `boolean` | — |
| options | Menu options, See [MenuOptions](./ContextMenuInstance.md#menuoptions) | `MenuOptions` | — |

## Events

| Event name | Description | Arguments |
| :----: | :----: | :----: |
| close | This event is triggered when the menu is closed | - |

## Slots

| Slot name | Description | Arguments |
| :----: | :----: | :----: |
| itemRender | Global menu item render slot | MenuItemRenderData |
| itemIconRender | Global menu item icon render slot | MenuItemRenderData |
| itemLabelRender | Global menu item label render slot  | MenuItemRenderData |
| itemRightArrowRender | Global menu item right arrow render slot  | MenuItemRenderData |
| itemCheckRender | Global menu check mark render slot | MenuItemRenderData |
| itemShortcutRender | Global menu shortcut key badge render slot | MenuItemRenderData |
| separatorRender | Global menu separator render slot  | - |

## ContextMenuInstance

ContextMenu Component ref interface,

You can use `(this.$refs.myMenu as ContextMenuInstance)` or `const mymenu = ref<ContextMenuInstance>()`.

### `closeMenu(fromItem?: MenuItem|undefined): void`

  Close this menu..

  | Param | Explain |
  | :----: | :----: |
  | fromItem | The last clicked menu item, will pass to `MenuOptions.onClose` callback, if user does not click any item, can be `undefined`. |

### `isClosed(): boolean`

  Check if the menu is currently closed.

  Returns

  | Explain |
  | :----: |
  | Is this menu currently closed |

### `getMenuRef(): ContextSubMenuInstance`

  Get current Menu root instance.

  Returns

  | Explain |
  | :----: |
  | Return [`ContextSubMenuInstance`](./ContextMenuGroup.md#contextsubmenuinstance) of root, return undefined if menu is not showing. |

### `getMenuDimensions(): { width: number, height: number }`

  Get root menu size.

  Returns

  | Explain |
  | :----: |
  | Return root menu size in pixel, return all zero if menu is not showing. |

## `MenuItemRenderData`

| Property | Description | Type |
| :----: | :----: | :----: |
| theme | Menu theme | `'light' 'dark'` |
| isOpen | This value indicates whether the current menu submenu is open | `boolean` |
| hasChildren | This value indicates whether the current menu has submenus | `boolean` |
| onClick | Define the click event callback of the element, which is used for the internal event processing of the menu. When rendering item with slot, please call this function back, otherwise the menu cannot respond to the event normally | - |
| onMouseEnter | Mouse in event callback of custom element. When rendering item with slot, please call this function back, otherwise the menu cannot respond to the event normally | - |
| close | Calling this function will close the current menu | - |
| ... | Other arguments are same with `MenuItem` | - |
