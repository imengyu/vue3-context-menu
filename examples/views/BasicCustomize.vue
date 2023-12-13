<template>
  <div class="horbox">
    <div class="box1" style="flex: 1" @contextmenu="onContextMenu($event)">
      Right click to show contextmenu with custom content !
    </div>

    <div class="box1" style="flex: 1" @contextmenu="onContextMenu2($event)">
      Right click to show FullCustomize contextmenu !
    </div>
  </div>
  
  <div class="box4">
    You can open examples\views\BasicCustomize.vue file view complete source code.
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
import ContextMenu from '../../library/ContextMenuInstance';
import type { MenuOptions } from '../../library/ContextMenuDefine';

export default defineComponent({
  mounted() {
    (window as unknown as {
      hljs: {
        highlightAll: () => void
      }
    }).hljs?.highlightAll?.();
  },
  methods: {
    onContextMenu(e : MouseEvent) {
      e.preventDefault();
      ContextMenu.showContextMenu({
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
    onContextMenu2(e : MouseEvent) {
      e.preventDefault();
      ContextMenu.showContextMenu({
        // The slot rendering submenu container is temporarily unavailable, 
        // but the custom class can be used to customize the style of the container
        customClass: "my-menu-box", 
        items: [
          { 
            label: 'Simple item',
            onClick: () => alert('Click Simple item'),
          },
          { 
            label: 'Item with a icon',
            icon: "https://imengyu.top/assets/images/test/icon.png",
            onClick: () => alert('Click Simple item'),
          },
          {
            label: "Submenu with Submenu",
            divided: 'up',
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
                    divided: 'up',
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
        zIndex: 3,
        minWidth: 230,
        x: e.x,
        y: e.y
      } as MenuOptions, {
        //Use slot in function mode
        itemRender: ({ disabled, label, icon, showRightArrow, onClick, onMouseEnter }) => [  h('div', { 
          class: 'my-menu-item'+(disabled?' disabled':''),
          onMouseenter: onMouseEnter,
          onClick: onClick,
        }, [
          icon ? h('img', { src: icon }) : h('div', { class: 'icon-place-holder' }),
          h('span', label),
          showRightArrow ? h('span', { class: 'right-arraw' }, '>>') : h('div'),
        ]) ],
        separatorRender: () => [ h('div', { class: 'my-menu-sperator' }) ]
      })
    },
  }
});
</script>


<style>
.my-menu-box {
  border-radius: 0!important;
  box-shadow: none!important;
  border: 1px solid #585858!important;
  background-color: #fff!important;
  padding: 0!important;
}
.my-menu-item {
  padding: 2px 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
}
.my-menu-item:hover {
  background-color: rgb(223, 223, 223);
}
.my-menu-item .icon-place-holder {
  width: 20px;
  height: 20px;
}
.my-menu-item img {
  width: 20px;
  height: 20px;
}
.my-menu-item span {
  font-size: 15px;
  color: #000;
  white-space: nowrap;
}
.my-menu-item .right-arraw {
  font-size: 20px;
  color: #f05;
}
.my-menu-sperator {
  border-bottom: 1px dashed #f00;
}
</style>