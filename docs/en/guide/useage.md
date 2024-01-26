---
title: Usage
order: 1
---

# Usage

## Import

```js
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'

createApp(App).use(ContextMenu)     
```

## Show menu

There are two ways to display menus:

The first is the function mode. You can use  `this.$contextmenu` or `showContextMenu` global function displays a menu with menu data:

::: my-sandbox {template=vue3-ts}

```ts /src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import ContextMenu from '@imengyu/vue3-context-menu'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'

createApp(App)
  .use(ContextMenu)
  .mount('#app')
```

```vue /src/App.vue [active]
<script setup lang="ts">
import ContextMenu from '@imengyu/vue3-context-menu'

function onContextMenu(e : MouseEvent) {
  //prevent the browser's default menu
  e.preventDefault();
  //show your menu
  ContextMenu.showContextMenu({
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
</script>

<template>
  <button @contextmenu="onContextMenu">Right click me to show context menu!</button>
</template>
```

:::

> Note: `this.$contextmenu` can only be used in templates or optional api.

The second is the component mode. You can use the component and template to display the menu:

::: my-sandbox {template=vue3-ts}

```ts /src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import ContextMenu from '@imengyu/vue3-context-menu'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'

createApp(App)
  .use(ContextMenu)
  .mount('#app')
```

```vue /src/App.vue [active]
<template>
  <button @contextmenu="onContextMenu">Right click me to show context menu!</button>
  <context-menu
    v-model:show="show"
    :options="options"
  >
    <context-menu-item label="Simple item" @click="onMenuClick(0)" />
    <context-menu-sperator /><!--use this to add sperator-->
    <context-menu-group label="Menu with child">
      <context-menu-item label="Item1" @click="onMenuClick(1)" />
      <context-menu-item label="Item2" @click="onMenuClick(2)" />
      <context-menu-group label="Child with v-for 50">
        <context-menu-item v-for="index of 50" :key="index" :label="'Item3-'+index" @click="onMenuClick(index + 3)" />
      </context-menu-group>
    </context-menu-group>
  </context-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MenuOptions } from '@imengyu/vue3-context-menu'

const show = ref(false);
const options = ref<MenuOptions>({
  zIndex: 3,
  minWidth: 230,
  x: 500,
  y: 200
});

function onMenuClick(index : number) {
  alert('You clicked menu item ' + index)
}
function onContextMenu(e : MouseEvent) {
  e.preventDefault();
  //Show component mode menu
  show.value = true;
  options.value.x = e.x;
  options.value.y = e.y;
}

</script>
```

:::

## Dynamic change menu

You only need to declare the menu data as responsive data, so that you can dynamically modify the menu:

### Function mode

```js
const menuData = reactive({
  items: [
    { 
      label: 'Simple item',
      onClick: () => alert('Click Simple item'),
    },
  ]
});

//Use in function mode
ContextMenu.showContextMenu(menuData);

//You can change properties at any time after the menu is displayed:
menuData.items[0].label = 'My label CHANGED!'; //Change label
menuData.items[0].hidden = true; //Change hidden
```

### Component mode

The dynamic control of component mode is simpler. You can use the `v-if` directive to dynamically control the display, or you can directly bind menu parameters to variables. The changes are just like normal components.

The following example shows how to dynamically display/hide menus and dynamically modify menu item text in component mode:

```vue
<template>
  <context-menu
    v-model:show="show"
    :options="optionsComponent"
  >
    <context-menu-item label="Test item dynamic show and hide" :clickClose="false" @click="showItem=!showItem" />
    <context-menu-item v-if="showItem" label="Click the item above to show/hide me" />
    <context-menu-sperator v-if="showItem" />
    <context-menu-item :label="itemText" :clickClose="false" @click="changeLabelText" />
  </context-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { MenuOptions } from '@imengyu/vue3-context-menu';

export default defineComponent({
  data() {
    return {
      show: false,
      showItem: true,
      itemText: 'Test item dynamic change label',
      optionsComponent: {
        x: 500,
        y: 200
      } as MenuOptions,
    }
  },
  methods: {
    onContextMenu(e : MouseEvent) {
      e.preventDefault();
      //Set the mouse position
      this.optionsComponent.x = e.x;
      this.optionsComponent.y = e.y;
      //Show menu
      this.show = true;
    },
    changeLabelText() {
      this.itemText = (this.itemText == 'My label CHANGED!' ? 'Test item dynamic change label' : 'My label CHANGED!');
    },
  }
});
</script>
```

## Menu bar

This library comes with a menu bar component, which is very similar to the function of the right-click menu and the menu bar. Therefore, it is integrated into the library, and you can also use this component to implement the main menu bar function of desktop programs.

::: my-sandbox {template=vue3-ts}

```ts /src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import ContextMenu from '@imengyu/vue3-context-menu'
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'

createApp(App)
  .use(ContextMenu)
  .mount('#app')
```

```vue /src/App.vue [active]

<template>
  <MenuBar :options="menuData" />
</template>

<script setup lang="ts">
import { MenuBar } from '@imengyu/vue3-context-menu';

const menuData : MenuBarOptions = {
  items: [
    {
      label: "File",
      children: [
        { label: "New" },
        { label: "Open" },
        { 
          label: "Open recent",
          children: [
            { label: "File 1...." },
            { label: "File 2...." },
            { label: "File 3...." },
            { label: "File 4...." },
            { label: "File 5...." },
          ],
        },
        { label: "Save", divided: true },
        { label: "Save as..." },
        { label: "Close" },
        { label: "Exit" },
      ],
    },
    {
      label: "Edit",
      children: [
        { label: "Undo" },
        { label: "Redo" },
        { label: "Cut", divided: true },
        { label: "Copy" },
        { label: "Find", divided: true },
        { label: "Replace" },
      ],
    },
    {
      label: "View",
      children: [
        { label: "Zoom in" },
        { label: "Zoom out" },
        { label: "Reset zoom" },
        { label: "Full screent", divided: true },
        { label: "Find", divided: true },
        { label: "Replace" },
      ],
    },
    {
      label: "Help",
      children: [
        { label: "About" },
      ],
    },
  ],
  zIndex: 3,
  minWidth: 230,
};
</script>
```

:::
