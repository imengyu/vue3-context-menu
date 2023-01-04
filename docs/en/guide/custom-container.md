---
title: Customize the menu mount container
order: 4
---

# Customize the menu mount container

Allows you to mount the menu to any container. If not specified, it is mounted to the body by default.

Usually, it can be used in an editor like environment: You only need to display the menu in one area, but not the other.

After the mount container is modified, the menu will be displayed inside the specified container and will not exceed it.

## Set the container

Just specify the getContainer property on MenuOptions to set the mount container:

```ts
ContextMenu.showContextMenu({
  getContainer: () => myMenuContainer, //myMenuContainer is the container
  //...
})
```

> Note: myMenuContainer needs to set `position: relative` style, otherwise the display position of the menu may be incorrect.

## Coordinate Settings

Before, the menu was displayed according to the whole screen range. The input x y is the screen coordinate, which is no problem.

After changing the mount container, the menu display area has changed, so the menu display location may be incorrect. Therefore, you need to change the x and y values to ensure that the display position is correct.

* The MenuOptions.x is the distance from the menu to the left edge of the container;
* The MenuOptions.y is the distance from the menu to the top edge of the container;

You may need to use the `ContextMenu.transformMenuPosition` to transform coordinates of the menu position:

```ts
function onContextMenu(e: MouseEvent) {
  const scaledPosition = ContextMenu.transformMenuPosition(e.target as HTMLElement, e.offsetX, e.offsetY, myMenuContainer); //myMenuContainer is the container
  //show menu
  ContextMenu.showContextMenu({
    x: scaledPosition.x,
    y: scaledPosition.y,
  //...
  });
}
```
