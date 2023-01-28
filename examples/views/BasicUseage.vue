<template>
  <div>
    <div class="horbox">
      <div class="box1" style="flex:1" @contextmenu="onContextMenu($event)">
        Right click here to show contextmenu !
      </div>
      <div class="box1" style="flex:1;padding: 50px" @contextmenu="onContextMenu1($event)">
        Test nested menus: Contextmenu In parent
        <div class="box2" style="width: 200px; height: 100px" @contextmenu="onContextMenu2($event)">
          Contextmenu In child
        </div>
      </div>
    </div>
    <div class="box4">
      You can open examples\views\BasicUseage.vue file view complete source code.
    </div>
    <!--Demo scripts-->
    <div class="box2">
      <ol>
        <li>
          Install:
          <pre>
            <code class="language-shell">          
npm install -save @imengyu/vue3-context-menu
            </code>
          </pre>
        </li>
        <li>
          Import vue3-context-menu in main.js:
          <pre>
            <code class="language-javascript">        
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'

createApp(App)
  .use(ContextMenu)        
            </code>
          </pre>
        </li>
        <li>
          Add events to the elements that you want show contextmenu: 
          <pre>
            <code class="language-javascript">        
&lt;div class="box" @contextmenu="onContextMenu($event)"&gt;
            </code>
          </pre>

          Then show your menu:
          <pre>
            <code class="language-javascript">  
  onContextMenu(e : MouseEvent) {
    //prevent the browser's default menu
    e.preventDefault();
    //show our menu
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
            </code>
          </pre>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { MenuOptions } from '../../src/ContextMenuDefine';
import ContextMenu from '../../src/ContextMenuInstance';

onMounted(() => {
  //highlight demo code
  (window as unknown as {
      hljs: {
        highlightAll: () => void
      }
    }).hljs?.highlightAll?.();
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
          shortcut: "Ctrl + S",
          onClick: () => {
            alert("You click Save as");
          }
        },
        { 
          label: "Print...", 
          icon: "icon-print",
          shortcut: "Ctrl + P",
          onClick: () => {
            alert("You click Print");
          } 
        },
        { 
          label: "Download", 
          icon: "icon-print",
          shortcut: "Ctrl + D",
          disabled: true,
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
      divided: true,
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
      label: 'Test item checked mark',
      clickClose: false,
      checked: false,
      onClick: () => {
        menuData.items[6].checked = !menuData.items[6].checked;
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
    { 
      label: "Disabled Item",
      disabled: true,
    },
  ],
  iconFontClass: 'iconfont',
  customClass: "class-a",
  keyboardControl: true,
  zIndex: 3,
  minWidth: 230,
  x: 0,
  y: 0,
});

function onContextMenu(e : MouseEvent) {
  //prevent the browser's default menu
  e.preventDefault();
  menuData.x = e.x;
  menuData.y = e.y;
  //show our menu
  ContextMenu.showContextMenu(menuData);
}

function onContextMenu1(e : MouseEvent) {
  //prevent the browser's default menu
  e.preventDefault();
  //show our menu
  ContextMenu.showContextMenu({
    items: [
      { 
        label: 'This is menu in parent box',
      },
      { 
        label: 'Simple item',
      },
    ],
    iconFontClass: 'iconfont',
    customClass: "class-a",
    zIndex: 3,
    minWidth: 230,
    x: e.x,
    y: e.y
  } as MenuOptions);
}
function onContextMenu2(e : MouseEvent) {
  //prevent the browser's default menu
  e.preventDefault();
  e.stopPropagation();
  //show our menu
  ContextMenu.showContextMenu({
    items: [
      { 
        label: 'This is menu in child box',
      },
      { 
        label: 'Simple item',
      },
    ],
    iconFontClass: 'iconfont',
    customClass: "class-a",
    zIndex: 3,
    minWidth: 230,
    x: e.x,
    y: e.y
  } as MenuOptions);
}
</script>

<style>
.class-a {
  font-family: 'Times New Roman', Times, serif;
}
</style>