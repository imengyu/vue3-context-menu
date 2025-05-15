<template>
  <div>
    <div class="horbox">
      <div class="box1" style="flex:1" @contextmenu="onContextMenu($event)">
        Right click here to show contextmenu !
      </div>
      <div class="box1" style="flex:1">
        Here are context menu with direction
        <br>
        <br>
        <div class="grid">
          <div @contextmenu="onContextMenu3($event, 'tl')">Top Left</div>
          <div @contextmenu="onContextMenu3($event, 't')">Top Center</div>
          <div @contextmenu="onContextMenu3($event, 'tr')">Top Right</div>
          <div @contextmenu="onContextMenu3($event, 'l')">Left</div>
          <div></div>
          <div @contextmenu="onContextMenu3($event, 'r')">Right</div>
          <div @contextmenu="onContextMenu3($event, 'bl')">Bottom Left</div>
          <div @contextmenu="onContextMenu3($event, 'b')">Bottom Center</div>
          <div @contextmenu="onContextMenu3($event, 'br')">Bottom Right</div>
        </div>
        <div class="box2" style="width: 270px; height: 80px; font-style: 15px;" :tabindex="1" @contextmenu="onContextMenu($event)" @keydown="handleKeyPress">
          Test keyboard event: Use arrow key to navigate menus.
          <br>
          Down div event catch: {{ testDownDivKey }}
        </div>
      </div>
      <div class="box1" style="flex:1;padding: 50px" @contextmenu="onContextMenu1($event)">
        Test nested menus: Contextmenu In parent
        <div class="box2" style="width: 170px; height: 50px" @contextmenu="onContextMenu2($event)">
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
import { computed, onMounted, reactive, ref } from 'vue'
import type { MenuOptions } from '../../library/ContextMenuDefine';
import ContextMenu from '../../library/ContextMenuInstance';

onMounted(() => {
  //highlight demo code
  (window as unknown as {
      hljs: {
        highlightAll: () => void
      }
    }).hljs?.highlightAll?.();
});

const testDownDivKey = ref('None');

function handleKeyPress(e: KeyboardEvent) {
  console.log('Key press: ', e.key);
  testDownDivKey.value = e.key;
}

const members = [
  '1',
  '2',
  '3',
];
const issue = ref({
  members: [
    '3'
  ]
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
      onSubMenuOpen() {
        console.log('onSubMenuOpen');
      },
      onSubMenuClose() {
        console.log('onSubMenuClose');
      },
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
          label: "Long submenu (With maxHeight)",
          divided: true, 
          maxHeight: 300,
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
          label: "Submenu with maxWidth", 
          maxWidth: 230,
          children: [
            { label: "1 this is long text text text text text text text text" },
            { label: "2 this is long text text text text text text text text" },
            { 
              label: "3 this is long text text text text text text text text",
              children: [
                { label: "Item1" },
                { label: "Item2" },
                { label: "Item3" },
              ]
            },
          ]
        },
        { 
          label: "A submenu", 
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
        menuData.items![4].hidden = !menuData.items![4].hidden;
      },
    },
    { 
      label: 'Click the item above ↑ to show/hide me',
      divided: true,
    },
    { 
      label: 'Test item dynamic change the label',
      clickClose: false,
      onClick: () => {
        if (menuData.items![5].label === 'Test item dynamic change the label')
          menuData.items![5].label = 'My label CHANGED!';
        else
          menuData.items![5].label = 'Test item dynamic change the label';
      },
    },
    { 
      label: 'Test item checked mark',
      clickClose: false,
      checked: false,
      onClick() {
        console.log(this);
        
        this.checked = !this.checked;
      },
    },
    { 
      label: 'Test submenu direction',
      children: [
        { 
          label: "Left Top", 
          direction: 'tl',
          children: [
            { label: "Item1" },
            { label: "Item2" },
            { label: "Item3" },
          ]
        },
        { 
          label: "Left Center", 
          direction: 'l',
          children: [
            { label: "Item1" },
            { label: "Item2" },
            { label: "Item3" },
          ]
        },
        { 
          label: "Left Bottom", 
          direction: 'bl',
          children: [
            { label: "Item1" },
            { label: "Item2" },
            { label: "Item3" },
          ]
        },
        { 
          label: "Right Top", 
          direction: 'tr',
          children: [
            { label: "Item1" },
            { label: "Item2" },
            { label: "Item3" },
          ]
        },
        { 
          label: "Right Center", 
          direction: 'r',
          children: [
            { label: "Item1" },
            { label: "Item2" },
            { label: "Item3" },
          ]
        },
        { 
          label: "Right Bottom (Default)", 
          children: [
            { label: "Item1" },
            { label: "Item2" },
            { label: "Item3" },
          ]
        },
        { 
          label: "Center Top", 
          direction: 't',
          children: [
            { label: "Item1" },
            { label: "Item2" },
            { label: "Item3" },
          ]
        },
        { 
          label: "Center Bottom", 
          direction: 'b',
          children: [
            { label: "Item1" },
            { label: "Item2" },
            { label: "Item3" },
          ]
        },
      ]
    },
    { 
      label: 'Test submenu divider',
      children: [
        { 
          label: "Simple", 
          children: [
            { label: "Item1 divided down", divided: true },
            { label: "Item2" },
            { label: "Item3" },
          ]
        },
        { 
          label: "Divided up", 
          children: [
            { label: "Item1" },
            { label: "Item2 Divided up", divided: 'up' },
            { label: "Item3" },
          ]
        },
        { 
          label: "Divided item", 
          children: [
            { label: "Item1" },
            { divided: 'self' },
            { label: "Item3" },
          ]
        },
      ]
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
      label: 'members',
      children: members.map(member => ({
        label: member,
        checked: computed(() => issue.value.members?.find(m => m === member) ? true : false),
        clickClose: false,
        onClick: () => {
          if (issue.value.members.find(m => m === member)) {
            issue.value.members = issue.value.members.filter(m => m !== member);
          } else {
            issue.value.members.push(member);
          }
        },
      })),
    },
    { 
      label: "Disabled Item",
      disabled: true,
    },
  ],
  iconFontClass: 'iconfont',
  customClass: "class-a",
  keyboardControl: true,
  //menuTransitionProps: {
  //  name: 'fade'
  //},
  zIndex: 3,
  minWidth: 230,
  x: 0,
  y: 0,
  onClose(item) {
    console.log('onClose', item);
  },
});

function onContextMenu(e : MouseEvent) {
  //prevent the browser's default menu
  e.preventDefault();
  menuData.x = e.x;
  menuData.y = e.y;
  //show our menu
  ContextMenu.showContextMenu(menuData as MenuOptions);
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
function onContextMenu3(e : MouseEvent, direction: string) {
  //prevent the browser's default menu
  e.preventDefault();
  e.stopPropagation();
  //show our menu
  ContextMenu.showContextMenu({
    items: [
      { 
        label: 'This is menu with intital direction',
      },
      { 
        label: 'Simple item',
        children: [
          { label: "Item1" },
          { label: "Item2" },
          { label: "Item3" },
        ]
      },
    ],
    direction,
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>