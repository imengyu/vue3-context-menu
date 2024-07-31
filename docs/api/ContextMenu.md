---
title: ContextMenu
nav:
  title: API参考
  order: 3
---

# ContextMenu

菜单主体组件。

## Props

| 属性 | 描述 | 类型 | 默认值 |
| :----: | :----: | :----: | :----: |
| show(v-model) | 是否显示菜单 | `boolean` | — |
| options | 菜单相关定义 | [`MenuOptions`](./ContextMenuInstance.md#menuoptions) | — |

## Events

| 事件名 | 描述 | 参数 |
| :----: | :----: | :----: |
| close | 菜单关闭时触发此事件 | - |

## Slots

| 插槽名 | 描述 | 参数 |
| :----: | :----: | :----: |
| itemRender | 当前菜单全局条目渲染插槽 | MenuItemRenderData |
| itemIconRender | 当前菜单全局图标渲染插槽 | MenuItemRenderData |
| itemLabelRender | 当前菜单全局文字渲染插槽 | MenuItemRenderData |
| itemRightArrowRender | 当前菜单全局右侧箭头渲染插槽 | MenuItemRenderData |
| itemCheckRender | 当前菜单全局复选框渲染插槽 | MenuItemRenderData |
| itemShortcutRender | 当前菜单全局快捷键标记渲染插槽 | MenuItemRenderData |
| separatorRender | 当前菜单分隔符渲染插槽 | - |

## ContextMenuInstance

ContextMenu 组件接口，表示菜单基础实例。

你可以使用 `(this.$refs.myMenu as ContextMenuInstance)` 或者 `const mymenu = ref<ContextMenuInstance>()` 来使用。

### `closeMenu(fromItem?: MenuItem|undefined): void`

  关闭菜单.

  | 参数 | 说明 |
  | :----: | :----: |
  | fromItem | 最后单击的菜单项，将传递给 `MenuOptions.onClose` 回调，如果用户没有点击任何项，可以是 `undefined` 。 |

### `isClosed(): boolean`

  检查当前菜单是否关闭。

  返回值

  | 说明 |
  | :----: |
  | 当前实例是否已经关闭 |

### `getMenuRef(): ContextSubMenuInstance`

  获取当前菜单根实例。

  返回值

  | 说明 |
  | :----: |
  | 返回根的 [`ContextSubMenuInstance`](./ContextMenuGroup.md#contextsubmenuinstance)，如果菜单未显示则返回 `undefined` 。 |

### `getMenuDimensions(): { width: number, height: number }`

  获取当前菜单根的外框大小。

  返回值

  | 说明 |
  | :----: |
  | 以像素为单位返回根菜单大小，如果菜单未显示则返回全零。 |

## MenuItemRenderData 结构

| 属性名 | 描述 | 类型 |
| :----: | :----: | :----: |
| theme | 菜单主题 | `'light' 'dark'` |
| isOpen | 指示当前菜单子菜单是否处于打开状态 | `boolean` |
| hasChildren | 指示当前菜单是否有子级菜单 | `boolean` |
| onClick | 自定义元素的点击事件回调，它用于菜单内部事件处理，当自定义渲染时，请回调此函数，否则菜单无法正常响应事件 | - |
| onMouseEnter | 自定义元素的鼠标移入事件回调，它用于菜单内部事件处理，当自定义渲染时，请回调此函数，否则菜单无法正常响应事件 | - |
| close | 调用此函数将关闭当前菜单 | - |
| ... | 其他参数与 `MenuItem` 一致 | - |
