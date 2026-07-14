---
title: MenuTrigger
nav:
  title: API参考
  order: 3
---

# MenuTrigger

菜单触发组件。包裹任意内容，根据触发方式和弹出方向，在触发元素附近显示菜单。

## Props

| 属性 | 描述 | 类型 | 默认值 |
| :----: | :----: | :----: | :----: |
| trigger | 触发方式 | `'click' \| 'hover'` | `'click'` |
| position | 弹出方向（相对于默认插槽内容） | `MenuPopDirection` | `'bl'` |
| offset | 弹出位置偏移量（像素） | `number` | `5` |
| disabled | 是否禁用 | `boolean` | `false` |

## Events

| 事件名 | 描述 | 参数 |
| :----: | :----: | :----: |
| show | 菜单应显示时触发，传出计算好的位置（用于函数式调用） | `{ x: number, y: number }` |
| hide | 菜单隐藏时触发 | - |

## Slots

| 插槽名 | 描述 | 参数 |
| :----: | :----: | :----: |
| default | 触发元素内容 | - |
| menu | 菜单内容 | `{ options: { x: number, y: number }, show: boolean }` |

## Exposed

| 方法 | 描述 |
| :----: | :----: |
| show() | 手动显示菜单 |
| hide() | 手动隐藏菜单 |

## 基本用法

### 组件模式

通过 `menu` 插槽渲染 ContextMenu 组件：

```vue
<MenuTrigger trigger="click" position="bl">
  <button>Click me</button>
  <template #menu="{ options: pos, show }">
    <ContextMenu
      :options="{ ...menuOptions, x: pos.x, y: pos.y }"
      :show="show"
    >
      <ContextMenuItem label="Option 1" />
      <ContextMenuItem label="Option 2" />
    </ContextMenu>
  </template>
</MenuTrigger>
```

### 函数模式

通过 `show` 事件获取位置，调用 `ContextMenu.showContextMenu`：

```vue
<MenuTrigger trigger="click" position="bl" @show="onShow">
  <button>Click me</button>
</MenuTrigger>
```

```ts
function onShow(pos: { x: number, y: number }) {
  ContextMenu.showContextMenu({
    x: pos.x,
    y: pos.y,
    items: [
      { label: 'Item 1', onClick: () => {} },
      { label: 'Item 2', onClick: () => {} },
    ],
  })
}
```

### Hover 触发

hover 模式下鼠标需要同时离开触发元素和菜单才会关闭（有 100ms 延时）：

```vue
<MenuTrigger trigger="hover" position="br">
  <button>Hover me</button>
  <template #menu="{ options: pos, show }">
    <ContextMenu
      :options="{ ...menuOptions, x: pos.x, y: pos.y }"
      :show="show"
    >
      <ContextMenuItem label="Item 1" />
    </ContextMenu>
  </template>
</MenuTrigger>
```
