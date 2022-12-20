---
title: 函数模式
---

# 函数模式

## ContextMenu

```ts
import ContextMenu from '@imengyu/vue3-context-menu'
```

菜单全局函数，

* `ContextMenu.showContextMenu(options: MenuOptions, customSlots?: Record<string, Slot>)`

  显示菜单.

  | 参数 | 说明 |
  | :----: | :----: |
  | options | 菜单的数据 |
  | customSlots | 这些插槽允许您自定义当前菜单的样式，这些插槽的名称与 [组件模式 ContextMenu](./ContextMenu.md) 中的插槽名称相同 |

* `ContextMenu.closeContextMenu()`

  手动关闭当前打开的菜单.

* `this.$contextmenu`

  与 `ContextMenu.showContextMenu` 相同，但此函数注册到 Vue 全局属性中，可以在Vue实例中直接使用。

* `ContextMenu.transformMenuPosition`

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
| items | 菜单结构信息 | `MenuItem[]` | — | — |
| x | 菜单显示X坐标 | `number` | — | `0` |
| y | 菜单显示Y坐标 | `number` | — | `0` |
| xOffset | 子菜单与父菜单X的偏移 | `number` | — | `0` |
| yOffset | 子菜单与父菜单Y的偏移 | `number` | — | `0` |
| iconFontClass | 自定义图标字体类名 | `string` | — | `iconfont` |
| zIndex | 菜单的`z-index` | `number` | — | `2` |
| customClass | 自定义菜单类名 | `string` | — | — |
| minWidth | 主菜单最小宽度 | `number` | — | `100` |
| maxWidth | 主菜单最大宽度 | `number` | — | `600` |
| theme | 菜单的主题 | `string` | `'light' 'dark'` | `light` |
| closeWhenScroll | 用户滚动鼠标时是否关闭菜单 | `boolean` | - | `true` |
| adjustPadding | 自动调整菜单时的上下边距 | `number` | — | `10` |
| getContainer | 自定义菜单挂载容器。[详情请参考](../guide/custom-container.md) | `HTMLElement` or `(() => HTMLElement)` | — | — |

## MenuItem

| 属性 | 描述 | 类型 | 可选值 | 默认值 |
| :----: | :----: | :----: | :----: | :----: |
| label | 菜单项名称，可传入VNode | `string` or `VNode` or `((label: string) => VNode)` | — | — |
| icon | 菜单项图标，可传入VNode | `string` or `VNode` or `((icon: string) => VNode)` | — | — |
| iconFontClass | 自定义图标字体类名 | `string` | — | `iconfont` |
| svgIcon | 菜单项图标 svg，仅在 icon 为空时有效 | `string` | — | — |
| svgProps | 当使用 svg 图标时，自定义 svg 标签属性 | `SVGAttributes` | — | — |
| disabled | 是否禁用菜单项 | `boolean` | — | `false` |
| hidden | 是否隐藏单项 | `boolean` | — | `false` |
| adjustSubMenuPosition | 是否在子菜单超出屏幕后进行自动调整 | `boolean` | — | `true` |
| clickableWhenHasChildren | 指定当本菜单下有子菜单时，点击当前菜单是否触发点击事件 | `boolean` | — | `false` |
| clickClose | 点击当前菜单项是否自动关闭整个菜单 | `boolean` | — | `true` |
| divided | 是否显示分割线 | `boolean` | — | `false` |
| customClass | 自定义子菜单class | `string` | — | — |
| minWidth | 子菜单最小宽度 | `number` | — | `100` |
| maxWidth | 子菜单最大宽度 | `number` | — | `600` |
| onClick | 菜单项点击事件 | `Function()` | — | — |
| customRender | 菜单项整体自定义渲染回调 | `VNode` or `((item: MenuItemRenderData) => VNode)` | — | — |
| children | 子菜单结构信息 | `MenuItem[]` | — | — |