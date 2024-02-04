---
title: Customize Styles and Rendering
order: 3
---

# Customize Styles and Rendering

## Custom style

It is recommended that you use a custom theme, but you still can override the default menu style. All CSS style definitions are in [`/ContextMenu.scss`](https://github.com/imengyu/vue3-context-menu/blob/main/library/ContextMenu.scss) source code. You can copy all the styles, modify them as needed, and store them in your file. Then overwrite the default style where you import:

```js
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import 'your-style-file-path.scss'
```

### Custom Fonts

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

### CSS variables

The style of the menu has extracted some css variables for you to use. You can easily change the color of each menu state.

```scss
//Backgroud
--mx-menu-backgroud: #fff; //Menu background color
--mx-menu-hover-backgroud: #f1f1f1; //The background color of the menu item when hovering
--mx-menu-active-backgroud: #dfdfdf; //The background color of the menu item when the mouse is pressed
--mx-menu-open-backgroud: #f1f1f1; //The background color of the menu item when the menu item submenu is opened
--mx-menu-open-hover-backgroud: #f1f1f1; // The background color of the menu item when the menu item submenu is opened and the mouse is hovering
--mx-menu-divider: #f0f0f0; //Menu divider color

//Text
--mx-menu-text: #2e2e2e; //Menu text color
--mx-menu-hover-text: #2e2e2e; //Menu text color when hovering
--mx-menu-active-text: #2e2e2e; //Menu text color when the mouse is pressed
--mx-menu-open-text: #2e2e2e; //Menu text color when the menu item submenu is opened
--mx-menu-open-hover-text: #2e2e2e; //Menu text color when the menu item submenu is opened and the mouse is hovering
--mx-menu-disabled-text: #c9c8c8; //Menu text color when the menu item is disabled

//Shadow
--mx-menu-shadow-color: rgba(0, 0, 0, 0.1); //Menu Background Shadow Color
--mx-menu-backgroud-radius: 10px; //Menu background radius size

//Shortcut badge
--mx-menu-shortcut-backgroud: #ebebeb; //The background color of the menu shortcut key badge, and its four states
--mx-menu-shortcut-backgroud-hover:#ebebeb;
--mx-menu-shortcut-backgroud-active:#ebebeb;
--mx-menu-shortcut-backgroud-open:#ebebeb;
--mx-menu-shortcut-backgroud-disabled:#fdfdfd;
--mx-menu-shortcut-text: #424242; //The text color of the menu shortcut key badge, and its four states
--mx-menu-shortcut-text-hover: #424242;
--mx-menu-shortcut-text-active: #424242;
--mx-menu-shortcut-text-open: #424242;
--mx-menu-shortcut-text-disabled: #a5a5a5;

//Focus border color
--mx-menu-focus-color: #0085f1; //The color of the outline when the menu item is activated by keyboard

//Icon placeholder width
--mx-menu-placeholder-width: 24px; //Width of icon placeholder area
```

## Customize rendering

The menu provides some slots that allow you to customize some parts of the rendering. For details, please refer to the example source code:

* Functional mode [examples/views/BasicCustomize.vue](https://github.com/imengyu/vue3-context-menu/blob/main/examples/views/BasicCustomize.vue)
* Component mode [examples/views/ComponentCustomize.vue](https://github.com/imengyu/vue3-context-menu/blob/main/examples/views/ComponentCustomize.vue)。

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
})
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

> Note: The function mode also supports these slots. You only need to pass the second parameter into the [showContextMenu](../api/ContextMenuInstance.md#contextmenushowcontextmenuoptions-menuoptions-customslots-recordstring-slot) funvtion and provide the slot rendering function, For the case, refer to sample code [examples\views\BasicCustomize.vue](https://github.com/imengyu/vue3-context-menu/blob/main/examples/views/BasicCustomize.vue) line 112.

The following is a case of fully customized menus. You can use this case to encapsulate your own menu components.

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

Usage after encapsulation:

```vue
//TestMyMenu.vue
<template>
  <!--The usage is the same as before-->
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
import MyContextMenu from './MyContextMenu.vue';//Import the menu component above 

export default defineComponent({
  data() {
    return {
      show: false,
      x: 500,
      y: 200
    }
  },
  component: {
    //Register component
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
