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
| iconFontClass | 自定义图标字体类名 | `string` | `iconfont` |
| preserveIconWidth | 是否应为没有图标的菜单项保留固定宽度的图标区域 | `boolean` | `true` |
| svgIcon | 菜单项图标 svg，仅在 icon 为空时有效 | `string` | — |
| svgProps | 当使用 svg 图标时，自定义 svg 标签属性 | `SVGAttributes` | — |
| disabled | 是否禁用菜单项 | `boolean` | `false` |
| checked | 是否选中菜单项 | `boolean` | `false` |
| shortcut | 当前菜单项的快捷键指示，此快捷键只用于显示给用户看，快捷键的注册还是需要你自己处理 | `string` | `''` |
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

## ContextMenuGroupRef

### `getSubMenuRef(): ContextSubMenuInstance`

  获取当前子菜单实例。

  返回值

  | 说明 |
  | :----: |
  | [`ContextSubMenuInstance`](#contextsubmenuinstance) 。 |

### `getMenuItemRef(): ContextSubMenuInstance`

  获取当菜单条目控制实例。

  返回值

  | 说明 |
  | :----: |
  | [`MenuItemContext`](./ContextMenuItem.md#menuitemcontext)。 |

## ContextSubMenuInstance

表示弹出菜单的控制实例，使用它可以控制菜单的更复杂的控制，包括获取菜单项，获取高度，位置，滚动，设置滚动数值，位置等等。

函数模式下可以从 `ContextMenuInstance.getMenuRef` 获取。

### `getSubmenuRoot(): HTMLElement`

  获取当前子菜单的显示根元素。

### `getMenu(): HTMLElement`

  获取当前子菜单的内容容器元素。

### `getChildItem(index: number) : MenuItemContext | undefined`

  通过数组索引获取子菜单项控制实例，只有在显示父子菜单后才能检索子菜单项。

  参数

  | 参数 | 说明 |
  | :----: | :----: |
  | index | 菜单项索引。 |

  返回值

  | 说明 |
  | :----: |
  | 可以根据索引获取控制实例 [MenuItemContext](./ContextMenuItem.md#menuitemcontext)，以实现对菜单项的实时控制。 |

### `getMenuDimensions(): { width: number, height: number }`

  获取当前子菜单的大小。

  返回值

  | 说明 |
  | :----: |
  | 以像素为单位返回根菜单大小，如果菜单未显示则返回全零。 |

### `getScrollValue(): number`

  获取子菜单当前滚动值 (与 element.scrollTop 相同)。

### `getScrollHeight(): number`

  获取子菜单当前滚动高度 (与 element.scrollHeight 相同)。

### `getMaxHeight(): number`

  获取子菜单的最高高度。

### `getPosition(): { width: number, height: number }`

  获取子菜单当前位置(相对于父项)。

### `setScrollValue(v: number): void`

  设置子菜单当前滚动值 (与 element.scrollTop 相同)。

  参数

  | 参数 | 说明 |
  | :----: | :----: |
  | v | 菜单滚动高度。 |

### `setPosition(x: number, y: number): void`

  设置子菜单当前位置(相对于父项)。

  参数

  | 参数 | 说明 |
  | :----: | :----: |
  | x | X轴位置 |
  | y | Y轴位置 |
