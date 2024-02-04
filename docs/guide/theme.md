---
title: 主题
order: 5
---

# 主题

## 内置主题

菜单内置了以下几种主题，你可以选择你喜欢的使用。

只需要在菜单选项中设置 `theme` 字段即可：

```js
this.$contextmenu({
  theme: 'mac dark',
  items: [
  ],
  //省略...
});
```

|主题|说明|示意图|
|--|--|--|
|`default`|默认主题|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-default.jpg)|
|`default dark`|默认主题深色|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-default-dark.jpg)|
|`flat`|精简扁平菜单|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-flat.jpg)|
|`flat dark`|精简扁平菜单深色|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-flat-dark.jpg)|
|`win10`|仿Win10菜单白色|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-win10.jpg)|
|`win10 dark`|仿Win10菜单黑色|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-win10-dark.jpg)|
|`mac`|仿 macos catalina 菜单|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-mac.jpg)|
|`mac dark`|仿 macos catalina 菜单深色模式|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-mac-dark.jpg)|

## 自定义主题

你可以新写你自己的主题，只需要保证主题名字与内置名字不同即可。

菜单所有的css样式定义都在 [`/ContextMenu.scss`](https://github.com/imengyu/vue3-context-menu/blob/main/library/ContextMenu.scss) 中。
你可以将所有样式复制出来，按需修改，存放在你的主题文件中。

### 自定义主题示例

例如下面是一个示例主题 `my-theme-name` 的实现，你自己的主题也可以按这个方式实现:

```scss
.mx-context-menu.my-theme-name {
  & {
    //在这里覆盖默认css变量的值
    --mx-menu-backgroud: #ececec;
    --mx-menu-hover-backgroud: #0165e1;
  }
  
  //自定义菜单外层样式
  padding: 8px 0;
  box-shadow: 0px 5px 7px 1px var(--mx-menu-shadow-color);
  border: 1px solid var(--mx-menu-border-color);

  //自定义其他菜单部件的样式
  .mx-context-menu-item {
    border-radius: 5px;
    margin: 0 6px;
    padding: 3px 6px;
  }

  //这里篇幅有限，完整的每个部件的样式请在 ContextMenu.scss 中查看
}
.mx-menu-bar.my-theme-name {
  //自定义菜单栏的样式
}
```

然后导入主题文件，即可在 theme 中使用：

```js
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import '你的样式文件路径.scss'
```