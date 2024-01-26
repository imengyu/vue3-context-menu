---
title: 菜单图标
order: 3
---

# 菜单图标

菜单组件不提供任何图标，如果您想添加图标，推荐使用 [iconfont](http://iconfont.cn) 图标库。

## 字体图标

使用 iconfont 图标库，导入字体后填写 `MenuItem` 的 `icon` 属性，即可在菜单项前面显示图标。

* 如果字体名称不一样，可用 `MenuItem` 或者 `MenuOptions` 的 `iconFontClass` 属性指定其他字体。
* 默认使用 `<i>` 元素来显示图标。

## SVG 图标

支持使用 svg symbol 来显示图标：

```html
<svg viewBox="0 0 80 20" xmlns="http://www.w3.org/2000/svg">
  <!-- Your icon -->
  <symbol id="icon-multiply" viewBox="0 0 1024 1024">
    <path d="M512 64C264.608 64 64 264.608 64 512c0 247.36 200.608 448 448 448 247.36 0 448-200.64 448-448 0-247.392-200.64-448-448-448z m158.4 651.552L512 557.312l-158.4 158.24-45.312-45.248L466.688 512l-158.304-158.4 45.312-45.312L512 466.688l158.4-158.4 45.28 45.312L557.312 512l158.368 158.4-45.28 45.152z" fill="#F74A21"></path>
  </symbol>
</svg>
```

```js
this.$contextmenu({
  items: [
    { 
      label: "Item with svg icon",
      svgIcon: "#icon-multiply",
      svgProps: {
        fill: '#f60',
      },
    },
  ],
  //...省略
});
```

> 注：使用 iconfont 库导出的图标库，会附带 `iconfont.js` ，你只需要在 html 中引入这个js，他会自动为你导入所有的 svg symbol，你可直接复制图标名称使用。

## 自定义渲染

你也可以通过菜单的插槽来完全自定义渲染图标，如：

在组件模式自定义图标：

```html
<context-menu-item label="Item with custom icon slot" @click="alertContextMenuItemClicked('Item3')">
  <template #icon>
    <img src="https://imengyu.top/assets/images/test/icon.png" style="width:20px;height:20px" />
  </template>
</context-menu-item>
```

自定义整个菜单的图标：

```html
<context-menu
  v-model:show="show"
  :options="options"
>
  <template #itemIconRender={ icon }>
    <!--icon就是属性中传入的icon属性，你可以在这里使用自己的图标组件-->
    <img :src="icon" style="width:20px;height:20px" />
  </template>
  ...
</context-menu>
```

在函数模式自定义图标：

```js
import { h } from 'vue';

{ 
  label: "Item with custom icon render",
  icon: h('img', {
    src: 'https://imengyu.top/assets/images/test/icon.png',
    style: {
      width: '20px',
      height: '20px',
    }
  }),
  divided: true, 
},
```
