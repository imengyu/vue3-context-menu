<template>
  <div>
    <div class="box1" @contextmenu="onContextMenu($event)">
      Right click here to show contextmenu !
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
    //shou our menu
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

<script lang="ts">
import { defineComponent } from 'vue'
import { MenuOptions } from '../../src/ContextMenuDefine';

export default defineComponent({
  mounted() {
    (window as unknown as {
      hljs: {
        highlightAll: () => void
      }
    }).hljs.highlightAll();
  },
  methods: {
    onContextMenu(e : MouseEvent) {
      //prevent the browser's default menu
      e.preventDefault();
      //shou our menu
      this.$contextmenu({
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
        ],
        iconFontClass: 'iconfont',
        customClass: "class-a",
        zIndex: 3,
        minWidth: 230,
        x: e.x,
        y: e.y
      } as MenuOptions);
    },
  }
});
</script>