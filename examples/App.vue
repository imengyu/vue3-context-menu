<template>
  <div class="test">

    <div class="box" @contextmenu="onContextMenu($event)">
      Right click to show contextmenu. (Use <code>$contextmenu</code>)
    </div>

    <div class="box" @click="onButtonClick($event)">
      Click to show contextmenu. (Use component)
    </div>

    <context-menu
      v-model:show="show"
      :options="options" />

    <div class="box2" @contextmenu="onContextMenu2($event)">

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
import { MenuOptions } from '../src/ContextMenuDefine'

export default defineComponent({
  data() {
    return {
      show: false,
      options: {
        items: [
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
          {
            label: "A submenu",
            divided: true, 
            children: [
              { 
                label: "Reload2", 
                divided: true, 
                icon: "icon-reload-",
                onClick: () => {
                  alert("You click Reload2");
                }
              },
              {
                label: "Very long submenu",
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
                divided: true, 
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
              { label: "Settings", icon: "icon-settings-1" },
              { label: "View source", icon: "icon-terminal" },
              { label: "Inspect" }
            ]
          },
          { label: "View source", icon: "icon-terminal" },
          { label: "Inspect" }
        ],
        iconFontClass: 'iconfont',
        customClass: "class-a",
        zIndex: 3,
        minWidth: 230,
        x: 500,
        y: 200
      } as MenuOptions,
      optionsCopy: {
        items: [
          {
            label: "Copy",
            onClick: () => {
              document.execCommand('copy');
            }
          },
          { label: "Paste", disabled: true },
          {
            label: "Print",
            icon: 'icon-print',
            onClick: () => {
              document.execCommand('print');
            }
          },
        ],
        iconFontClass: 'iconfont',
        customClass: "class-a",
        minWidth: 230,
        x: 0,
        y: 0
      }
    }
  },
  mounted() {
    (window as any).hljs.highlightAll();
  },
  methods: {
    onButtonClick(e : MouseEvent) {
      this.show = true;
      this.options.x = e.x;
      this.options.y = e.y;
    },
    onContextMenu(e : MouseEvent) {
      e.preventDefault();
      this.options.x = e.x;
      this.options.y = e.y;
      this.$contextmenu(this.options);
    },
    onContextMenu2(e : MouseEvent) {
      e.preventDefault();
      if(document.getSelection().toString().length > 0) {
        this.optionsCopy.x = e.x;
        this.optionsCopy.y = e.y;
        this.$contextmenu(this.optionsCopy);
      }
    },

  }
})
</script>

<style>


html, body, #app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
}
.test {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}

.box {
  width: 80%;
  padding: 20px 60px;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 10px;
  background-color: #eeeeee;
  cursor: pointer;
}
.box:active {
  background-color: #dadada;
}
.box2 {
  width: 80%;
  padding: 20px 60px;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 10px;
  background-color: #777777;
  color: #fff;
}
code {
  border-radius: 10px;
}

</style>
