<template>
  <div class="box1" @contextmenu="onContextMenu($event)">
    Right click to show contextmenu with custom content !
  </div>
  
  <div class="box4">
    You can open examples\views\BasicUseage.vue file view complete source code.
  </div>

  <!--Demo scripts-->
  <div class="box2">
    <pre>
      <code class="language-javascript">  
this.$contextmenu({
  items: [
    { 
      label: 'Simple item',
      onClick: () => alert('Click Simple item'),
    },
    { 
      label: 'Item with a icon (iconfont)',
      icon: "icon-reload-1",
    },
    { 
      label: "Item with custom icon render",
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
      </code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { MenuOptions } from '../..';

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
      e.preventDefault();
      this.$contextmenu({
        items: [
          { 
            label: 'Simple item',
            onClick: () => alert('Click Simple item'),
          },
          { 
            label: 'Item with a icon (iconfont)',
            icon: "icon-reload-1",
          },
          { 
            label: "Item with custom icon render",
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
      } as MenuOptions)
    },
  }
});
</script>