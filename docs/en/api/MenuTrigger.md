---
title: MenuTrigger
---

# MenuTrigger

A trigger component for showing menus. Wraps any content and displays a menu near the trigger element based on the trigger mode and pop-up direction.

## Props

| Property | Description | Type | Default |
| :----: | :----: | :----: | :----: |
| trigger | Trigger mode | `'click' \| 'hover'` | `'click'` |
| position | Pop-up direction relative to the trigger element | `MenuPopDirection` | `'bl'` |
| offset | Pop-up position offset (pixels) | `number` | `5` |
| disabled | Whether disabled | `boolean` | `false` |

## Events

| Event | Description | Parameters |
| :----: | :----: | :----: |
| show | Emitted when the menu should show, with the calculated position (for function mode) | `{ x: number, y: number }` |
| hide | Emitted when the menu hides | - |

## Slots

| Slot | Description | Props |
| :----: | :----: | :----: |
| default | Trigger element content | - |
| menu | Menu content | `{ options: { x: number, y: number }, show: boolean }` |

## Exposed

| Method | Description |
| :----: | :----: |
| show() | Manually show the menu |
| hide() | Manually hide the menu |

## Usage

### Component mode

Render ContextMenu via the `menu` slot:

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

### Function mode

Use the `show` event to get position and call `ContextMenu.showContextMenu`:

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

### Hover trigger

In hover mode, the menu only closes when the mouse leaves both the trigger element and the menu (with a 100ms delay):

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
