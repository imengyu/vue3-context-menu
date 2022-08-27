<template>
  <div class="box1" @contextmenu="onContextMenu($event)">
    Right click to show a Light theme contextmenu !
  </div>

  <div class="box1" @contextmenu="onContextMenu2($event)">
    Right click to show a Dark theme contextmenu !
  </div>

  <div class="box4">
    You can open examples\views\Theme.vue file view complete source code.
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { MenuOptions } from '../../src/ContextMenuDefine';

export default defineComponent({
  methods: {
    onContextMenu(e : MouseEvent) {
      e.preventDefault();
      this.$contextmenu({
        items: [
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
        iconFontClass: 'iconfont',
        zIndex: 3,
        minWidth: 230,
        x: e.x,
        y: e.y
      } as MenuOptions);
    },
    onContextMenu2(e : MouseEvent) {
      e.preventDefault();
      this.$contextmenu({
        items: [
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
        iconFontClass: 'iconfont',
        theme: 'dark',
        zIndex: 3,
        minWidth: 230,
        x: e.x,
        y: e.y
      } as MenuOptions);
    },
  }
});
</script>