---
title: Menu icon
order: 2
---

# Menu icon

The menu component does not provide any icons. If you want to add an icon, it is recommended to use [iconfont](http://iconfont.cn) Icon library.

## Font icon

Use iconfont library: After importing, fill in the `icon` attribute of `MenuItem` to display the icon in front of the menu item.

* If the font names are different, you can specify other fonts by writing the `iconFontClass` attribute of `MenuItem` or `MenuOptions`.
* By default, the `<i>`  element is used to display icons

## SVG Icon

Support the use of svg `<symbol>` to display icons:

```html
<svg viewBox="0 0 80 20" xmlns="http://www.w3.org/2000/svg">
  <!-- Your icon -->
  <symbol id="icon-multiply" viewBox="0 0 1024 1024">
    <path d="M512 64C264.608 64 64 264.608 64 512c0 247.36 200.608 448 448 448 247.36 0 448-200.64 448-448 0-247.392-200.64-448-448-448z m158.4 651.552L512 557.312l-158.4 158.24-45.312-45.248L466.688 512l-158.304-158.4 45.312-45.312L512 466.688l158.4-158.4 45.28 45.312L557.312 512l158.368 158.4-45.28 45.152z" fill="#F74A21"></path>
  </symbol>
</svg>
```

```js
//Function mode
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
  //...
});
```

```js
//Component mode
<context-menu-item label="Item with svg icon" svgIcon="#icon-multiply" :svgProps="{ fill: '#f60' }" />
```

## Customize icon

You can also completely customize the rendering icon through the slot of the menu, such as:

```html
<context-menu-item label="Item with custom icon slot">
  <template #icon>
    <img src="https://imengyu.top/assets/images/test/icon.png" style="width:20px;height:20px" />
  </template>
</context-menu-item>
```

Customize the icon of the entire menu:

```html
<context-menu
  v-model:show="show"
  :options="options"
>
  <template #itemIconRender={ icon }>
    <!--icon is the icon attribute passed in the menu-item. You can use your own icon component here-->
    <img :src="icon" style="width:20px;height:20px" />
  </template>
  ... menu items ...
</context-menu>
```

Customize icon in function mode:

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
},
```
