---
title: Customize Styles and Rendering
order: 3
---

# Customize Styles and Rendering

## Custom style

If you think the menu style is not good-looking, you can rewrite the CSS style. All CSS style definitions are in [`/src/ContextSubMenu.vue`](https://github.com/imengyu/vue3-context-menu/blob/main/src/ContextSubMenu.vue). You can copy all the styles, modify them as needed, and store them in your file. Then overwrite the default style where you import:

```js
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import 'your-style-file-path.css'
```

## Custom Fonts

You can customize fonts through css:

```scss
//Set fonts for all menus
.mx-context-menu {
  font-family: 'Times New Roman', Times, serif;
}

//Set the font of the specified customClass menu
//this.$contextmenu({
//  customClass: 'my-menu',
//  ...
//});
.my-menu {
  font-family: 'Times New Roman', Times, serif;
}
```

## Customize

The menu provides some slots that allow you to customize some parts of the rendering. For details, please refer to the example source code [examples/views/BasicCustomize.vue](https://github.com/imengyu/vue3-context-menu/blob/main/examples/views/BasicCustomize.vue) [examples/views/ComponentCustomize.vue](https://github.com/imengyu/vue3-context-menu/blob/main/examples/views/ComponentCustomize.vue)。

### Functional mode

```js
this.$contextmenu({
  items: [
    { 
      label: "Item with custom icon render",
      //The icon attribute supports passing VNode rendering custom content
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
      //The label attribute supports passing VNode rendering custom content
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

### Component mode

Component mode supports more custom slots.

| Slot name | Description | Arguments |
| :----: | :----: | :----: |
| itemRender | Global menu item render slot | MenuItemRenderData |
| itemIconRender | Global menu item icon render slot | MenuItemRenderData |
| itemLabelRender | Global menu item label render slot  | MenuItemRenderData |
| itemRightArrowRender | Global menu item right arrow render slot  | MenuItemRenderData |
| separatorRender | Global menu separator render slot  | - |

The following is a case of fully customized menus. You can use this case to encapsulate your own menu components.

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
