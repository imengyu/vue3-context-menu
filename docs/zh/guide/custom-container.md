---
title: 自定义菜单挂载容器
order: 10
---

# 自定义菜单挂载容器

允许您将菜单挂载至任意容器，如果不指定，默认挂载至 body。

通常可以用于类似编辑器的环境，只需要其中某个区域显示菜单，而其他地方不显示。

挂载容器修改后，菜单会显示在指定容器的内部，不会超出它。

## 设置挂载容器

只需要在 MenuOptions 上指定 getContainer 属性，即可设置挂载容器：

```ts
ContextMenu.showContextMenu({
  getContainer: () => myMenuContainer, //myMenuContainer 是挂载容器
  //...
})
```

> 注意： myMenuContainer 需要设置 `position: relative;` 样式，否则菜单无法定位。

## 坐标设置

之前菜单是按整个屏幕的范围显示的，传入x y是屏幕坐标，这没有问题。

但是更改挂载容器后，菜单显示区域发生了更改，所以菜单显示位置可能不正确。因此，您需要更改传入的x和y值，以确保显示位置正确。

* `MenuOptions.x` 是从菜单到容器左边缘的距离；
* `MenuOptions.y` 是从菜单到容器顶部边缘的距离；

您可能需要使用 `ContextMenu.transformMenuPosition` 转换菜单显示位置：

```ts
function onContextMenu(e: MouseEvent) {
  const scaledPosition = ContextMenu.transformMenuPosition(e.target as HTMLElement, e.offsetX, e.offsetY, myMenuContainer); //myMenuContainer 是挂载容器
  //show menu
  ContextMenu.showContextMenu({
    x: scaledPosition.x,
    y: scaledPosition.y,
  //...
  });
}
```
