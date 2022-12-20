<template>
  <div>
    <div class="box1" style="flex:1" @contextmenu="onContextMenu($event)">
      Right click here to show contextmenu !
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive } from 'vue'
import { MenuOptions } from '../../src/ContextMenuDefine';
import ContextMenu from '../../src/ContextMenuInstance';

onMounted(() => {
  document.body.setAttribute('style', 'transform: scale(0.5)')
});
onBeforeUnmount(() => {
  document.body.setAttribute('style', '')
});

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

function onContextMenu(e : MouseEvent) {
  //prevent the browser's default menu
  e.preventDefault();
  console.log(e);
  
  const scaledPosition = ContextMenu.transformMenuPosition(e.target as HTMLElement, e.offsetX, e.offsetY);

  menuData.x = scaledPosition.x;
  menuData.y = scaledPosition.y;
  //shou our menu
  ContextMenu.showContextMenu(menuData);
}

</script>