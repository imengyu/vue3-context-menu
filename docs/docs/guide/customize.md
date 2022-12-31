---
title: 自定义样式和渲染
order: 5
---

## 自定义样式

如果觉得菜单样式不好看，可以重写css样式，所有的css样式定义都在 [`/src/ContextSubMenu.vue`](https://github.com/imengyu/vue3-context-menu/blob/main/src/ContextSubMenu.vue) 中。你可以将所有样式复制出来，按需修改，存放在你的文件中。然后在导入的地方覆盖默认样式：

```js
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import '你的样式css文件路径.css'
```

## 自定义字体

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

完整案例可在这里查看 [examples/views/BasicCustomize.vue](https://github.com/imengyu/vue3-context-menu/blob/main/examples/views/BasicCustomize.vue) [examples/views/ComponentCustomize.vue](https://github.com/imengyu/vue3-context-menu/blob/main/examples/views/ComponentCustomize.vue)。

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
} as MenuOptions)
```

### 组件模式

组件模式支持更多的自定义插槽。

| 插槽名 | 描述 | 参数 |
| :----: | :----: | :----: |
| itemRender | 当前菜单全局条目渲染插槽 | MenuItemRenderData |
| itemIconRender | 当前菜单全局图标渲染插槽 | MenuItemRenderData |
| itemLabelRender | 当前菜单全局文字渲染插槽 | MenuItemRenderData |
| itemRightArrowRender | 当前菜单全局右侧箭头渲染插槽 | MenuItemRenderData |
| separatorRender | 当前菜单分隔符渲染插槽 | - |

下方是一个完全自定义菜单的案例，你可以参考此案例封装自己的菜单组件使用。

```vue
<template>
  <!--this is Full Customized context-menu-->
  <context-menu
    v-model:show="show"
    :options="options"
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
  </context-menu>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { MenuOptions } from '../..';

export default defineComponent({
  data() {
    return {
      show: false,
      options: {
        // The slot rendering submenu container is temporarily unavailable, 
        // but the custom class can be used to customize the style of the container
        customClass: "my-menu-box", 
        zIndex: 3,
        minWidth: 230,
        x: 500,
        y: 200
      } as MenuOptions,
    }
  },
  methods: {
    onContextMenu(e : MouseEvent) {
      e.preventDefault();
      //Set the mouse position
      this.options.x = e.x;
      this.options.y = e.y;
      //Show menu
      this.show = true;
    },
    alertContextMenuItemClicked(name: string) {
      alert(name);
    },
  }
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
