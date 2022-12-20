<template>
  <div>
    <div class="horbox">
      <div class="box1" style="flex: 1;">
        long content  long content  long content  long content  long content  long content  long content  long content  long content  long content 
        long content  long content  long content  long content  long content  long content  long content  long content  long content  long content 
        long content  long content  long content  long content  long content  long content  long content  long content  long content  long content 
      </div>
      <div ref="menuContainer" class="box3" style="flex:4">
        The menu will be mounted in this container.
        <div class="box1" style="flex:1;margin:10px 30px" @contextmenu="onContextMenu($event)">
          Right click to show contextmenu !
        </div>
        <div class="box1" style="flex:1;margin:10px 30px" @contextmenu="onContextComponentMenu($event)">
          And right click to show contextmenu (component mode) !
        </div>
      </div>
      <div class="box1" style="flex: 1;">
        long content  long content  long content  long content  long content  long content  long content  long content  long content  long content 
        long content  long content  long content  long content  long content  long content  long content  long content  long content  long content 
        long content  long content  long content  long content  long content  long content  long content  long content  long content  long content 
      </div>
    </div>
    <div class="box4">
      You can open examples\views\ChangeContainer.vue file view complete source code.
    </div>
    <!--this is component mode of context-menu-->
    <ContextMenuComponent
      v-model:show="componentMenuShow"
      :options="componentMenuOptions"
    >
      <context-menu-item label="Simple item" />
      <context-menu-item label="Item with a icon" icon="icon-reload-1" />
      <context-menu-group label="Menu with child">
        <context-menu-item label="Item1" />
        <context-menu-item label="Item1" />
      </context-menu-group>
      <context-menu-sperator />
      <context-menu-group label="Menu with child child child">
        <context-menu-item label="Item1" />
        <context-menu-item label="Item2" />
        <context-menu-sperator />
        <context-menu-group label="Child with v-for 50">
          <context-menu-item v-for="index of 50" :key="index" :label="'Item3-'+index" />
        </context-menu-group>
        <context-menu-group label="Childs">
          <context-menu-item label="Item1-1" />
          <context-menu-item label="Item1-2" />
          <context-menu-sperator />
          <context-menu-group label="Childs">
            <context-menu-item label="Item2-1" />
            <context-menu-item label="Item2-2" />
          </context-menu-group>
        </context-menu-group>
      </context-menu-group>
    </ContextMenuComponent>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { MenuOptions } from '../../src/ContextMenuDefine';
import ContextMenuComponent from '../../src/ContextMenu.vue';
import ContextMenu from '../../src/ContextMenuInstance';

const menuContainer = ref<HTMLElement>();
const menuData = reactive<MenuOptions>({
  items: [
    { 
      label: 'Simple item',
      onClick: () => alert('Click Simple item'),
    },
    {
      label: "Sub menu Example",
      children: [
        {
          label: "Back",
          onClick: () => {
            console.log("You click Back");
          }
        },
        { label: "Forward", disabled: true },
        { 
          label: "Reload", 
          divided: true, 
          icon: "icon-reload-1",
          onClick: () => {
            alert("You click Reload");
          }
        },
        { 
          label: "Save as...",
          icon: "icon-save",
          onClick: () => {
            alert("You click Save as");
          }
        },
        { 
          label: "Print...", 
          icon: "icon-print",
          onClick: () => {
            alert("You click Print");
          } 
        },
        { label: "View source", icon: "icon-terminal" },
        { label: "Inspect" }
      ],
    },
    {
      label: "Submenu with Submenu",
      children: [
        {
          label: "Very long submenu",
          divided: true, 
          children: [
            { label: "Test1" },
            { label: "Test2" },
            { label: "Test3" },
            { label: "Test4" },
            { label: "Test5" },
            { label: "Test6" },
            { label: "Test7" },
            { label: "Test8" },
            { label: "Test9" },
            { label: "Test10" },
            { label: "Test11" },
            { label: "Test12" },
            { label: "Test13" },
            { label: "Test14" },
            { label: "Test15" },
            { label: "Test16" },
            { label: "Test17" },
            { label: "Test18" },
            { label: "Test19" },
            { label: "Test20" },
            { label: "Test21" },
            { label: "Test22" },
            { label: "Test23" },
            { label: "Test24" },
            { label: "Test25" },
            { label: "Test26" },
          ]
        },
        { 
          label: "A submenu", 
          children: [
            { label: "Item1" },
            { label: "Item2" },
            { label: "Item3" },
          ]
        },
        { 
          label: "A submenu2", 
          children: [
            { label: "Item1" },
            { label: "Item2" },
            { label: "Item3" },
            { 
              label: "A submenu", 
              children: [
                { label: "Item1" },
                { label: "Item2" },
                { label: "Item3" },
              ]
            },
          ]
        },
      ]
    },
    { 
      label: 'Test item dynamic show and hide',
      clickClose: false,
      onClick: () => {
        menuData.items[4].hidden = !menuData.items[4].hidden;
      },
    },
    { 
      label: 'Click the item above to show/hide me',
    },
    { 
      label: 'Test item dynamic change the label',
      clickClose: false,
      onClick: () => {
        if (menuData.items[5].label === 'Test item dynamic change the label')
          menuData.items[5].label = 'My label CHANGED!';
        else
          menuData.items[5].label = 'Test item dynamic change the label';
      },
    },
    { 
      label: 'Item with icon',
      icon: "icon-reload-1",
    },
    { 
      label: "Item with svg icon",
      svgIcon: "#icon-clock",
    },
    { 
      label: "Item with svg icon",
      svgIcon: "#icon-multiply",
      svgProps: {
        fill: '#f60',
      },
    },
  ],
  iconFontClass: 'iconfont',
  customClass: "class-a",
  zIndex: 3,
  minWidth: 230,
  x: 0,
  y: 0,
});

const componentMenuShow = ref(false);
const componentMenuOptions = reactive<MenuOptions>({
  getContainer: () => menuContainer.value as HTMLElement,
  iconFontClass: 'iconfont',
  customClass: "class-a",
  zIndex: 3,
  minWidth: 230,
  x: 0,
  y: 0
});

function onContextMenu(e : MouseEvent) {
  //prevent the browser's default menu
  e.preventDefault();
  
  const scaledPosition = ContextMenu.transformMenuPosition(e.target as HTMLElement, e.offsetX, e.offsetY, menuContainer.value);

  menuData.getContainer = menuContainer.value;
  menuData.x = scaledPosition.x;
  menuData.y = scaledPosition.y;
  console.log(scaledPosition.x, scaledPosition.y);

  //show our menu
  ContextMenu.showContextMenu(menuData);
}
function onContextComponentMenu(e : MouseEvent) {
  //prevent the browser's default menu
  e.preventDefault();
  
  const scaledPosition = ContextMenu.transformMenuPosition(e.target as HTMLElement, e.offsetX, e.offsetY, menuContainer.value);
  componentMenuOptions.x = scaledPosition.x;
  componentMenuOptions.y = scaledPosition.y;
  console.log(componentMenuOptions.x, componentMenuOptions.y);

  //show our menu
  componentMenuShow.value = true;
}


</script>