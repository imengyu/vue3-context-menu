---
title: 函数模式
---

# 函数模式

## ContextMenu

```ts
import ContextMenu from '@imengyu/vue3-context-menu'
```

菜单全局函数。

### `ContextMenu.showContextMenu(options: MenuOptions, customSlots?: Record<string, Slot>)`

  显示菜单.

  | 参数 | 说明 |
  | :----: | :----: |
  | options | 菜单的数据 |
  | customSlots | 这些插槽允许您自定义当前菜单的样式，这些插槽的名称与 [组件模式 ContextMenu](./ContextMenu.md) 中的插槽名称相同，具体自定义方式，可参考[自定义文档](../guide/customize.md)。 |

  返回值

  | 类型 | 说明 |
  | :----: | :----: |
  | ContextMenuInstance | 当前菜单的实例，可调用 `closeMenu` 关闭菜单；可调用 `isClosed` 检查当前实例是否已经关闭 |

### `ContextMenu.closeContextMenu()`

  手动关闭当前打开的菜单.

### `this.$contextmenu`

  与 `ContextMenu.showContextMenu` 相同，但此函数注册到 Vue 全局属性中，可以在Vue实例中直接使用。

### `ContextMenu.transformMenuPosition`

  如果你的 `body` 元素处于缩放状态 (例如添加了样式 `transform: scale(0.5)`), 这可能会导致菜单显示位置不正确。
  你可以使用此函数来转换至正确的菜单显示位置:

  ```ts
  import ContextMenu from '@imengyu/vue3-context-menu'

  function onContextMenu(e: MouseEvent) {
    const scaledPosition = ContextMenu.transformMenuPosition(e.target as HTMLElement, e.offsetX, e.offsetY);
    //完整示例代码位于 `/examples/views/InScaledBody.vue`
    menuData.x = scaledPosition.x;
    menuData.y = scaledPosition.y;
    //显示菜单
    ContextMenu.showContextMenu(menuData);
  }
  ```

## MenuOptions

| 属性 | 描述 | 类型 | 可选值 | 默认值 |
| :----: | :----: | :----: | :----: | :----: |
| items | <div style="width:200px">菜单结构信息</div> | `MenuItem[]` | — | — |
| x | 菜单显示X坐标 | `number` | — | `0` |
| y | 菜单显示Y坐标 | `number` | — | `0` |
| xOffset | 子菜单与父菜单X的偏移 | `number` | — | `0` |
| yOffset | 子菜单与父菜单Y的偏移 | `number` | — | `0` |
| iconFontClass | 自定义图标字体类名 | `string` | — | `iconfont` |
| zIndex | 菜单的`z-index` | `number` | — | `2` |
| customClass | 自定义菜单类名 | `string` | — | — |
| minWidth | 主菜单最小宽度 | `number ` or `string` | — | `100` |
| maxWidth | 主菜单最大宽度 | `number ` or `string` | — | `600` |
| keyboardControl | 设置用户是否可以使用键盘键控制当前菜单 | `boolean` | — | `true` |
| theme | 菜单的[主题](../guide/theme.md) | `string` | `'default' 'dark' 'flat' 'win10' 'mac'` | `default` |
| preserveIconWidth | 是否应为没有图标的菜单项保留固定宽度的图标区域 | `boolean` | - | `true` |
| closeWhenScroll | 用户滚动鼠标时是否关闭菜单 | `boolean` | - | `true` |
| mouseScroll | 设置用户是否可以在菜单区域中使用鼠标滚轮来滚动长菜单。 | `boolean` | — | `false` |
| adjustPadding | 自动调整菜单时的上下边距 | `{ x: number, y: number }` or `number` | — | `10` |
| adjustPosition | 默认情况下，菜单将自动调整其位置，以防止溢出容器。如果允许菜单溢出容器，则可以将其设置为false。 | `boolean` | — | `true` |
| direction | 设置主菜单相对于坐标的弹出方向。如果 `adjustPosition` 为 `true` ，则菜单会根据可用空间自动调整弹出方向。 | `'br'|'b'|'bl'|'tr'|'t'|'tl'|'l'|'r'` | — | `'br'` |
| ignoreClickClassName | 若菜单项中的元素有这个className，单击它将忽略事件。| `string` | — |
| menuTransitionProps | 设置菜单显示隐藏时的 Vue Transition 组件属性。 | `TransitionProps` | — |
| clickCloseOnOutside | 设置是否当用户点击其他位置时应关闭菜单。| `boolean` | — | `true` |
| clickCloseClassName | 若菜单项中的元素有这个className，单击它将忽略事件，并且点击后会关闭菜单。| `string` | — |
| updownButtonSpaceholder | 决定菜单项中的上/下按钮是否需要空白占位。设置这个变量的目的是因为有些菜单主题会在菜单上下添加空白边距，这一部分空白边距刚好可以放置上/下按钮。如果你的自定义主题菜单中没有空白边距，则可以设置此字段为上/下按提供要空白占位，防止遮挡菜单条目。 | `boolean` | — | `false` |
| getContainer | 自定义菜单挂载容器。[详情请参考](../guide/custom-container.md) | `HTMLElement` or `(() => HTMLElement)` | — | — |
| onClose | 菜单关闭事件回调（通常在函数模式使用）。参数 lastClickItem 指示了触发关闭的菜单项（仅函数模式有效），如果用户没有点击菜单项而是点击其他地方关闭，则参数为 `undefined`。 | `((lastClickItem: MenuItem|undefined) => void)` | — | — |

## MenuItem

| 属性 | 描述 | 类型 | 可选值 | 默认值 |
| :----: | :----: | :----: | :----: | :----: |
| label | <div style="width:300px">菜单项名称，可传入VNode</div> | `string` or `VNode` or `((label: string) => VNode)` | — | — |
| icon | 菜单项图标，可传入VNode | `string` or `VNode` or `((icon: string) => VNode)` | — | — |
| iconFontClass | 自定义图标字体类名 | `string` | — | `iconfont` |
| preserveIconWidth | 是否应为没有图标的菜单项保留固定宽度的图标区域 | `boolean` | - | `true` |
| svgIcon | 菜单项图标 svg，仅在 icon 为空时有效 | `string` | — | — |
| svgProps | 当使用 svg 图标时，自定义 svg 标签属性 | `SVGAttributes` | — | — |
| disabled | 是否禁用菜单项 | `boolean` | — | `false` |
| hidden | 是否隐藏菜单项 | `boolean` | — | `false` |
| checked | 是否选中菜单项 | `boolean` | — | `false` |
| shortcut | 当前菜单项的快捷键指示，此快捷键只用于显示给用户看，快捷键的注册还是需要你自己处理 | `string` | — | `''` |
| adjustSubMenuPosition | 默认情况下，子菜单将自动调整其位置，以防止溢出容器。如果允许菜单溢出容器，可以将其设置为false | `boolean` | — | 继承自 `MenuOptions.adjustPosition` |
| clickableWhenHasChildren | 指定当本菜单下有子菜单时，点击当前菜单是否触发点击事件 | `boolean` | — | `false` |
| clickClose | 点击当前菜单项是否自动关闭整个菜单 | `boolean` | — | `true` |
| divided | 是否显示分割线。分割线显示逻辑<ul><li>`true` or `'down'`: 分割线显示在菜单项下方。</li><li> `'up'`: 分割线显示在菜单项上方。</li><li> `'self'`: 把当前菜单项变成分割线。</li><li> `false`: 没有分割线。 </li></ul> | `boolean` or `'up'` or `'down'` or `'self'` | — | `false` |
| customClass | 自定义子菜单class | `string` | — | — |
| minWidth | 子菜单最小宽度 | `number` or `string` | — | `100` |
| maxWidth | 子菜单最大宽度 | `number` or `string` | — | `600` |
| direction | 设置子菜单的弹出方向。如果 `adjustPosition` 为 `true` ，则菜单会根据可用空间自动调整弹出方向。 | `'br' or 'b' or 'bl' or 'tr' or 't' or 'tl' or 'l' or 'r'` | — | 继承自 `MenuOptions.direction` |
| onClick | 菜单项点击事件 | `Function()` | — | — |
| onSubMenuClose | 子菜单关闭事件回调 | `(() => void)` | — | — |
| onSubMenuOpen | 子菜单打开事件回调 | `(() => void)` | — | — |
| customRender | 菜单项整体自定义渲染回调 | `VNode` or `((item: MenuItemRenderData) => VNode)` | — | — |
| children | 子菜单结构信息 | `MenuItem[]` | — | — |
