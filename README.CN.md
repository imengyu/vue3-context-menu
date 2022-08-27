
# vue3-context-menu

一个使用 Vue3 制作的简洁美观简单的右键菜单组件

![截图](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/first.png)

---

[查看演示](https://imengyu.top/pages/vue3-context-menu-demo/)

## 特性

* 简洁易用，体积小
* 提供组件模式和函数模式，调用方便
* 可自定义

## 安装

```shell
npm install -save @imengyu/vue3-context-menu
```

## 使用

### 导入组件

```js
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'

createApp(App).use(ContextMenu)     
```

### 显示菜单

显示菜单有两种方式：

第一种是函数模式，可以使用 `this.$contextmenu` 通过菜单数据显示一个右键菜单：

```js
onContextMenu(e : MouseEvent) {
  //prevent the browser's default menu
  e.preventDefault();
  //shou your menu
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

第二种是组件模式，可以使用vue组件显示菜单：

```html
<context-menu
  v-model:show="show"
  :options="optionsComopnent"
>
  <context-menu-item label="Simple item" @click="onMenuClick(1)" />
  <context-menu-sperator /><!--use this to add sperator-->
  <context-menu-group label="Menu with child">
    <context-menu-item label="Item1" @click="onMenuClick(2)" />
    <context-menu-item label="Item2" @click="onMenuClick(3)" />
    <context-menu-group label="Child with v-for 50">
      <context-menu-item v-for="index of 50" :key="index" :label="'Item3-'+index" @click="onLoopMenuClick(index)" />
    </context-menu-group>
  </context-menu-group>
</context-menu>
```

```js
data() {
  return {
    show: false,
    //For $contextmenu
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
    },
    //For component
    optionsComopnent: {
      zIndex: 3,
      minWidth: 230,
      x: 500,
      y: 200
    },
  }
},
methods: {
  onButtonClick(e : MouseEvent) {
    //显示组件菜单
    this.show = true;
    this.options.x = e.x;
    this.options.y = e.y;
  },
}
```

## 菜单图标

菜单组件不提供任何图标，如果您想添加图标，推荐使用 [iconfont](http://iconfont.cn) 图标库，导入后填写 MenuItem 的 icon 属性，即可在菜单项前面显示图标。

*默认使用 `<i>` 元素来显示图标。*

## 自定义样式

如果觉得菜单样式不好看，可以重写css样式，所有的css样式定义都在 `/src/ContextSubMenu.vue` 中。你可以将所有样式复制出来，按需修改，存放在你的文件中。然后在导入的地方覆盖默认样式：

```js
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import '你的样式css文件路径.css'
```

## 自定义渲染

菜单提供了一些插槽，允许你自定义渲染某些部分，具体您可以参考案例源码 [examples\views\BasicCustomize.vue](examples\views\BasicCustomize.vue) [examples\views\ComponentCustomize.vue](examples\views\ComponentCustomize.vue)。

## API 参考

### 组件模式：组件属性与说明

#### ContextMenu

菜单主体组件。

##### Props

| 属性 | 描述 | 类型 | 默认值 |
| :----: | :----: | :----: | :----: |
| show(v-model) | 是否显示菜单 | `boolean` | — |
| options | 菜单相关定义 | `MenuOptions` | — |

##### Events

| 事件名 | 描述 | 参数 |
| :----: | :----: | :----: |
| close | 菜单关闭时触发此事件 | - |

##### Slots

| 插槽名 | 描述 | 参数 |
| :----: | :----: | :----: |
| itemRender | 当前菜单全局条目渲染插槽 | MenuItemRenderData |
| itemIconRender | 当前菜单全局图标渲染插槽 | MenuItemRenderData |
| itemLabelRender | 当前菜单全局文字渲染插槽 | MenuItemRenderData |
| itemRightArrowRender | 当前菜单全局右侧箭头渲染插槽 | MenuItemRenderData |
| speratorRender | 当前菜单分隔符渲染插槽 | - |

##### MenuItemRenderData 结构

| 属性名 | 描述 | 类型 |
| :----: | :----: | :----: |
| theme | 菜单主题 | `'light'|'dark'` |
| onClick | 自定义元素的点击事件回调，它用于菜单内部事件处理，当自定义渲染时，请回调此函数，否则菜单无法正常响应事件 | - |
| onMouseEnter | 自定义元素的鼠标移入事件回调，它用于菜单内部事件处理，当自定义渲染时，请回调此函数，否则菜单无法正常响应事件 | - |
| ... | 其他参数与 `MenuItem` 一致 | - |

#### ContextMenuItem

菜单条目组件。

##### Props

| 属性 | 描述 | 类型 | 默认值 |
| :----: | :----: | :----: | :----: |
| label | 菜单项名称 | `string` | — |
| icon | 菜单项图标 | `string` | — |
| disabled | 是否禁用菜单项 | `boolean` | `false` |
| clickableWhenHasChildren | 指定当本菜单下有子菜单时，点击当前菜单是否触发点击事件 | `boolean` | `false` |
| clickClose | 点击当前菜单项是否自动关闭整个菜单 | `boolean` | `true` |
| divided | 是否显示分割线 | `boolean` | `false` |
| customClass | 自定义子菜单class | `string` | — |
| onClick | 菜单项点击事件 | `Function()` | — |

##### Slots

| 插槽名 | 描述 | 参数 |
| :----: | :----: | :----: |
| default | 当前条目整体渲染插槽 | - |
| icon | 图标渲染插槽 | - |
| label | 文字渲染插槽 | - |
| rightArrow | 右侧箭头渲染插槽 | - |

##### Click

| 事件名 | 描述 | 参数 |
| :----: | :----: | :----: |
| click | 点击菜单时触发此事件 | - |

#### ContextMenuGroup

子菜单组件。

##### Props

| 属性 | 描述 | 类型 | 默认值 |
| :----: | :----: | :----: | :----: |
| label | 菜单项名称 | `string` | — |
| icon | 菜单项图标 | `string` | — |
| disabled | 是否禁用菜单项 | `boolean` | `false` |
| clickableWhenHasChildren | 指定当本菜单下有子菜单时，点击当前菜单是否触发点击事件 | `boolean` | `false` |
| adjustSubMenuPosition | 是否在子菜单超出屏幕后进行自动调整 | `boolean` | `true` |
| clickClose | 点击当前菜单项是否自动关闭整个菜单 | `boolean` | `true` |
| divided | 是否显示分割线 | `boolean` | `false` |
| customClass | 自定义子菜单class | `string` | — |
| minWidth | 子菜单最小宽度 | `number` | `100` |
| maxWidth | 子菜单最大宽度 | `number` | `600` |
| onClick | 菜单项点击事件 | `Function()` | — |

##### Slots

| 插槽名 | 描述 | 参数 |
| :----: | :----: | :----: |
| default | 子菜单渲染插槽 | - |

#### ContextMenuSperator

菜单分隔符组件。

### 函数模式：参数说明

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
| theme | 菜单的主题 | `string` | `'light'|'dark'` | `light` |

#### MenuItem

| 属性 | 描述 | 类型 | 可选值 | 默认值 |
| :----: | :----: | :----: | :----: | :----: |
| label | 菜单项名称，可传入VNode | `string|VNode|((label: string) => VNode)` | — | — |
| icon | 菜单项图标，可传入VNode | `string|VNode|((icon: string) => VNode)` | — | — |
| disabled | 是否禁用菜单项 | `boolean` | — | `false` |
| adjustSubMenuPosition | 是否在子菜单超出屏幕后进行自动调整 | `boolean` | — | `true` |
| clickableWhenHasChildren | 指定当本菜单下有子菜单时，点击当前菜单是否触发点击事件 | `boolean` | — | `false` |
| clickClose | 点击当前菜单项是否自动关闭整个菜单 | `boolean` | — | `true` |
| divided | 是否显示分割线 | `boolean` | — | `false` |
| customClass | 自定义子菜单class | `string` | — | — |
| minWidth | 子菜单最小宽度 | `number` | — | `100` |
| maxWidth | 子菜单最大宽度 | `number` | — | `600` |
| onClick | 菜单项点击事件 | `Function()` | — | — |
| customRender | 菜单项整体自定义渲染回调 | `VNode|((item: MenuItemRenderData) => VNode)` | — | — |
| children | 子菜单结构信息 | `MenuItem[]` | — | — |
