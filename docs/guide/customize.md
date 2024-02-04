---
title: 自定义样式和渲染
order: 5
---

# 自定义样式和渲染

## 自定义样式

如果你觉得默认菜单样式不好看，想修改掉它，还可以覆盖默认css样式（比起覆盖默认样式，但是还是推荐你使用自定义主题，更简单而且支持动态切换），所有的css样式定义都在源代码 [`/ContextMenu.scss`](https://github.com/imengyu/vue3-context-menu/blob/main/library/ContextMenu.scss) 中。你可以将所有样式复制出来，按需修改，存放在你的文件中。然后在导入的地方覆盖默认样式：

```js
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import '你的样式scss文件路径.scss'
```

### css变量

菜单的样式抽离了一些css变量供您使用，你可以很方便的修改颜色，无须每个状态都特殊指定。

```scss
//Backgroud
--mx-menu-backgroud: #fff; //菜单背景颜色
--mx-menu-hover-backgroud: #f1f1f1; //菜单条目鼠标悬浮时的背景颜色
--mx-menu-active-backgroud: #dfdfdf; //菜单条目鼠标按下时的背景颜色
--mx-menu-open-backgroud: #f1f1f1; //菜单条目子菜单打开时的背景颜色
--mx-menu-open-hover-background: #f1f1f1; //菜单条目子菜单打开时悬浮的背景颜色
--mx-menu-divider: #f0f0f0; //菜单分割线条目颜色

//Text
--mx-menu-text: #2e2e2e; //菜单文字颜色
--mx-menu-hover-text: #2e2e2e; //菜单条目鼠标悬浮时的文字颜色
--mx-menu-active-text: #2e2e2e; //菜单条目鼠标按下时的文字颜色
--mx-menu-open-text: #2e2e2e; //菜单条目子菜单打开时的文字颜色
--mx-menu-open-hover-text: #2e2e2e; //菜单条目子菜单打开时悬浮的文字颜色
--mx-menu-disabled-text: #c9c8c8; //菜单条目禁用的文字颜色

//Shadow
--mx-menu-shadow-color: rgba(0, 0, 0, 0.1); //菜单背景阴影颜色
--mx-menu-backgroud-radius: 10px; //菜单背景圆角大小

//Shortcut badge
--mx-menu-shortcut-backgroud: #ebebeb; //菜单快捷键标记的背景颜色，下方是它的四个状态
--mx-menu-shortcut-backgroud-hover:#ebebeb;
--mx-menu-shortcut-backgroud-active:#ebebeb;
--mx-menu-shortcut-backgroud-open:#ebebeb;
--mx-menu-shortcut-backgroud-disabled:#fdfdfd;
--mx-menu-shortcut-text: #424242; //菜单快捷键标记的文字颜色，下方是它的四个状态
--mx-menu-shortcut-text-hover: #424242;
--mx-menu-shortcut-text-active: #424242;
--mx-menu-shortcut-text-open: #424242;
--mx-menu-shortcut-text-disabled: #a5a5a5;

//Focus border color
--mx-menu-focus-color: #0085f1; //菜单项键盘激活时的外框颜色

//Icon placeholder width
--mx-menu-placeholder-width: 24px; //图标占位区域的宽度
```

### 自定义字体

你可以通过 css 自定义设置字体：

```scss
//设置所有菜单的字体
.mx-context-menu {
  font-family: 'Times New Roman', Times, serif;
}

//设置指定菜单的字体
.my-menu {
  font-family: 'Times New Roman', Times, serif;
}

//自定义类
//this.$contextmenu({
//  customClass: 'my-menu',
//  ...
//});
```

## 自定义渲染

菜单提供了一些插槽，允许你自定义渲染某些部分。

完整案例可在这里查看

* 函数模式 [examples/views/BasicCustomize.vue](https://github.com/imengyu/vue3-context-menu/blob/main/examples/views/BasicCustomize.vue)
* 组件模式 [examples/views/ComponentCustomize.vue](https://github.com/imengyu/vue3-context-menu/blob/main/examples/views/ComponentCustomize.vue)。

### 函数模式

```js
this.$contextmenu({
  customClass
  items: [
    { 
      label: "Item with custom icon render",
      //Icon 属性支持传入 VNode 自定义渲染内容
      icon: h('img', {
        src: 'https://imengyu.top/assets/images/test/icon.png',
        style: {
          width: '20px',
          height: '20px',
        }
      }),
      divided: true, 
    },
    { 
      //Label 属性支持传入 VNode 自定义渲染内容
      label: h('div', {
        style: {
          fontSize: '20px',
          color: '#f98',
        }
      }, "Item with custom render"),
    },
  ],
  zIndex: 3,
  minWidth: 230,
  x: e.x,
  y: e.y
})
```

### 组件模式

组件模式支持更多的自定义插槽。

> 注：函数模式也同样支持这些插槽，只需要在 [showContextMenu](../api/ContextMenuInstance.md#contextmenushowcontextmenuoptions-menuoptions-customslots-recordstring-slot) 函数传入第二个参数，提供插槽渲染函数，案例可参考 [examples\views\BasicCustomize.vue](https://github.com/imengyu/vue3-context-menu/blob/main/examples/views/BasicCustomize.vue) 112行。

| 插槽名 | 描述 | 参数 |
| :----: | :----: | :----: |
| itemRender | 当前菜单全局条目渲染插槽 | MenuItemRenderData |
| itemIconRender | 当前菜单全局图标渲染插槽 | MenuItemRenderData |
| itemLabelRender | 当前菜单全局文字渲染插槽 | MenuItemRenderData |
| itemRightArrowRender | 当前菜单全局右侧箭头渲染插槽 | MenuItemRenderData |
| separatorRender | 当前菜单分隔符渲染插槽 | - |

下方是一个完全自定义菜单的案例，你可以参考此案例二次封装自己的菜单组件使用。

```vue
//MyContextMenu.vue
<template>
  <!--this is Full Customized context-menu-->
  <context-menu
    :show="show"
    :options="{ ...options, x, y }"
    @update:show="(v: boolean) => $emit('update:show', v)"
  >
    <!--itemRender slot can customize the rendering of the entire menu item-->
    <template #itemRender="{ disabled, label, icon, showRightArrow, onClick, onMouseEnter }">
      <div 
        :class="'my-menu-item'+(disabled?' disabled':'')"
        @click="onClick"
        @mouseenter="onMouseEnter"
      >
        <img v-if="icon" :src="icon" />
        <div v-else class="icon-place-holder"></div>
        <span>{{label}}</span>
        <span v-if="showRightArrow" class="right-arraw">>></span>
      </div>
    </template>

    <slot />
  </context-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { MenuOptions } from '@imengyu/vue3-context-menu';

export default defineComponent({
  data() {
    return {
      options: {
        // The slot rendering submenu container is temporarily unavailable, 
        // but the custom class can be used to customize the style of the container
        customClass: "my-menu-box", 
        zIndex: 3,
        minWidth: 230,
      } as MenuOptions,
    }
  },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style>
.my-menu-box {
  border-radius: 0!important;
  box-shadow: none!important;
  border: 1px solid #585858!important;
  background-color: #fff!important;
  padding: 0!important;
}
.my-menu-item {
  padding: 2px 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
}
.my-menu-item:hover {
  background-color: rgb(223, 223, 223);
}
.my-menu-item .icon-place-holder {
  width: 20px;
  height: 20px;
}
.my-menu-item img {
  width: 20px;
  height: 20px;
}
.my-menu-item span {
  font-size: 15px;
  color: #000;
  white-space: nowrap;
}
.my-menu-item .right-arraw {
  font-size: 20px;
  color: #f05;
}
.my-menu-sperator {
  border-bottom: 1px dashed #f00;
}
</style>
```

封装之后的使用方法：

```vue
//TestMyMenu.vue
<template>
  <!--使用方法与之前的一样-->
  <MyContextMenu
    v-model:show="show"
    :x="x"
    :y="y"
  >
    <context-menu-item label="Simple item" @click="alertContextMenuItemClicked('Item1')" />
    <context-menu-item label="Item with a icon" icon="https://imengyu.top/assets/images/test/icon.png" @click="alertContextMenuItemClicked('Item2')" />
    <context-menu-group label="Menu with child">
      <context-menu-item label="Item1" @click="alertContextMenuItemClicked('Item1')" />
      <context-menu-item label="Item1" @click="alertContextMenuItemClicked('Item1')" />
    </context-menu-group>
    <div class="my-menu-sperator"></div>
    <context-menu-group label="Menu with child child child">
      <context-menu-item label="Item1" @click="alertContextMenuItemClicked('Item1')" />
      <context-menu-item label="Item2" @click="alertContextMenuItemClicked('Item2')" />
      <context-menu-group label="Child with v-for 50">
        <context-menu-item v-for="index of 50" :key="index" :label="'Item3-'+index" @click="alertContextMenuItemClicked('Item3' + index)" />
      </context-menu-group>
      <div class="my-menu-sperator"></div>
      <context-menu-group label="Childs">
        <context-menu-item label="Item1-1" @click="alertContextMenuItemClicked('Item1-1')" />
        <context-menu-item label="Item1-2" @click="alertContextMenuItemClicked('Item1-2')" />
        <div class="my-menu-sperator"></div>
        <context-menu-group label="Childs">
          <context-menu-item label="Item2-1" @click="alertContextMenuItemClicked('Item2-1')" />
          <context-menu-item label="Item2-2" @click="alertContextMenuItemClicked('Item2-2')" />
        </context-menu-group>
      </context-menu-group>
    </context-menu-group>
  </MyContextMenu>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import MyContextMenu from './MyContextMenu.vue';//导入上面的组件

export default defineComponent({
  data() {
    return {
      show: false,
      x: 500,
      y: 200
    }
  },
  component: {
    //注册组件
    MyContextMenu
  },
  methods: {
    onContextMenu(e : MouseEvent) {
      e.preventDefault();
      //Set the mouse position
      this.x = e.x;
      this.y = e.y;
      //Show menu
      this.show = true;
    },
    alertContextMenuItemClicked(name: string) {
      alert(name);
    },
  }
});
</script>
```

### 特殊样式

`mx-context-no-clickable` : 如果你在子元素中添加这个样式，则点击子元素不会触发菜单的点击事件。
