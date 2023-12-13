<template>

  <div class="horbox">
    <div class="box6" style="flex:1" @contextmenu="onContextMenu($event, 'light')">
      Right click to show a <b>default theme</b> contextmenu !
    </div>
    <div class="box5" style="flex:1" @contextmenu="onContextMenu($event, 'dark')">
      Right click to show a <b>default dark theme</b> contextmenu !
    </div>
  </div>
  <div class="horbox">
    <div class="box6" style="flex:1" @contextmenu="onContextMenu($event, 'flat')">
      Right click to show a <b>flat theme</b> contextmenu !
    </div>
    <div class="box5" style="flex:1" @contextmenu="onContextMenu($event, 'flat dark')">
      Right click to show a <b>flat dark theme</b> contextmenu !
    </div>
  </div>
  <div class="horbox">
    <div class="box6" style="flex:1" @contextmenu="onContextMenu($event, 'win10')">
      Right click to show a <b>win10 theme</b> contextmenu !
    </div>
    <div class="box5" style="flex:1" @contextmenu="onContextMenu($event, 'win10 dark')">
      Right click to show a <b>win10 dark theme</b> contextmenu !
    </div>
  </div>
  <div class="horbox">
    <div class="box6" style="flex:1" @contextmenu="onContextMenu($event, 'mac')">
      Right click to show a <b>mac theme</b> contextmenu !
    </div>
    <div class="box5" style="flex:1" @contextmenu="onContextMenu($event, 'mac dark')">
      Right click to show a <b>mac dark theme</b> contextmenu !
    </div>
  </div>

  <div class="box4">
    You can open examples\views\Theme.vue file view complete source code.
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { MenuOptions } from '../../library/ContextMenuDefine';

export default defineComponent({
  methods: {
    onContextMenu(e : MouseEvent, theme: string) {
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
                shortcut: "Ctrl + S",
                disabled: true,
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
            shortcut: "Ctrl + S",
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
        theme: theme,
        iconFontClass: 'iconfont',
        zIndex: 3,
        minWidth: 230,
        x: e.x,
        y: e.y
      } as MenuOptions);
    },
  }
});
</script>