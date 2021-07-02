
vue3-context-menu
---
一个使用 Vue3 制作的右键菜单组件

![截图](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/first.png)

---

[查看演示](https://imengyu.top/pages/vue3-context-menu-demo/) 

---

### 安装

```
npm install -save @imengyu/vue3-context-menu
```

### 使用

导入组件：
```js
import ContextMenu from '@imengyu/vue3-context-menu'

createApp(App)
  .use(ContextMenu)     
```

```html
<div class="box" @contextmenu="onContextMenu($event)">
  Right click to show contextmenu.
</div>
```

显示菜单：
```js
onContextMenu(e : MouseEvent) {
  //prevent the browser's default menu
  e.preventDefault();
  //shou our menu
  this.$contextmenu({
    x: e.x,
    y: e.y,
    items: [
      { 
        label: "A menu item", 
        onClick: () => {
          alert("You click a menu item");
        }
      },
      { 
        label: "A submenu", 
        children: [
          { label: "Item1" },
          { label: "Item2" },
          { label: "Item3" },
        ]
      },
    ]
  });
}
```

同样，也可以使用组件模式显示菜单：

```html
<context-menu v-model:show="show" :options="options" />
```

```js
data() {
  return {
    show: false,
    options: {
      items:[
        {
          label: "Copy",
          onClick: () => {
            document.execCommand('copy');
          }
        },
        { label: "Paste", disabled: true },
        {
          label: "Print",
          icon: 'icon-print',
          onClick: () => {
            document.execCommand('print');
          }
        },
      ],
      iconFontClass: 'iconfont',
      customClass: "class-a",
      minWidth: 230,
      x: 0,
      y: 0
    }
  }
},
methods: {
  onButtonClick(e : MouseEvent) {
    //显示菜单
    this.show = true;
    this.options.x = e.x;
    this.options.y = e.y;
  },
}
```

### 参数说明

#### MenuOptions

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

#### MenuItem

| 属性 | 描述 | 类型 | 可选值 | 默认值 |
| :----: | :----: | :----: | :----: | :----: |
| label | 菜单项名称 | `string` | — | — |
| icon | 菜单项图标 | `string` | — | — |
| disabled | 是否禁用菜单项 | `boolean` | — | `false` |
| divided | 是否显示分割线 | `boolean` | — | `false` |
| customClass | 自定义子菜单class | `string` | — | — |
| minWidth | 子菜单最小宽度 | `number` | — | `100` |
| maxWidth | 子菜单最大宽度 | `number` | — | `600` |
| onClick | 菜单项点击事件 | `Function()` | — | — |
| children | 子菜单结构信息 | `MenuItem[]` | — | — |