<template>

  <div class="horbox">
    <div class="box1" style="flex: 1" @contextmenu="onContextMenu($event)">
      Right click to show contextmenu with custom content !
    </div>

    <div class="box1" style="flex: 1" @contextmenu="onContextMenu2($event)">
      Right click to show FullCustomize contextmenu !
    </div>
  </div>

  <div class="box3">
    <span v-if="clickItem">You clicked {{ clickItem }} !</span> 
    <span v-else>Try click a menu item</span> 
  </div>

  <div class="box4">
    You can open examples\views\ComponentCustomize.vue file view complete source code.
  </div>

  <div>

    <!--this is component mode of context-menu-->
    <context-menu
      v-model:show="show"
      :options="options"
    >
      <context-menu-item label="Simple item" @click="alertContextMenuItemClicked('Item1')" />
      <context-menu-item label="Item with a icon (iconfont)" icon="icon-reload-1" @click="alertContextMenuItemClicked('Item2')" />
      <context-menu-item label="Item with custom icon slot" @click="alertContextMenuItemClicked('Item3')">
        <template #icon>
          <img src="https://imengyu.top/assets/images/test/icon.png" style="width:20px;height:20px" />
        </template>
      </context-menu-item>
      <context-menu-item :clickClose="false">
        <template #icon>
          <img src="https://imengyu.top/assets/images/test/icon.png" style="width:16px;height:16px" />
        </template>
        <template #label>
          <div>Item with custom render</div>
          <select placeholder="Select a fruit">
            <option value="1">apple</option>
            <option value="2">watermelon</option>
            <option value="3">grape</option>
          </select>
        </template>
      </context-menu-item>
    </context-menu>

    <!--this is Full Customized context-menu-->
    <context-menu
      v-model:show="show2"
      :options="options2"
    >
      <!--itemRender slot can customize the rendering of the entire menu item-->
      <template #itemRender="{ disabled, label, icon, showRightArrow, onClick, onMouseEnter }">
        <div 
          :class="'my-menu-item'+(disabled?' disabled':'')"
          @click="onClick"
          @mouseenter="onMouseEnter"
        >
          <img v-if="icon" :src="icon" />
          <div v-else class="icon-place-holder"></div>
          <span>{{label}}</span>
          <span v-if="showRightArrow" class="right-arraw">>></span>
        </div>
      </template>

      <context-menu-item label="Simple item" @click="alertContextMenuItemClicked('Item1')" />
      <context-menu-item label="Item with a icon" icon="https://imengyu.top/assets/images/test/icon.png" @click="alertContextMenuItemClicked('Item2')" />
      <context-menu-group label="Menu with child">
        <context-menu-item label="Item1" @click="alertContextMenuItemClicked('Item1')" />
        <context-menu-item label="Item1" @click="alertContextMenuItemClicked('Item1')" />
      </context-menu-group>
      <div class="my-menu-sperator"></div>
      <context-menu-group label="Menu with child child child">
        <context-menu-item label="Item1" @click="alertContextMenuItemClicked('Item1')" />
        <context-menu-item label="Item2" @click="alertContextMenuItemClicked('Item2')" />
        <context-menu-group label="Child with v-for 50">
          <context-menu-item v-for="index of 50" :key="index" :label="'Item3-'+index" @click="alertContextMenuItemClicked('Item3' + index)" />
        </context-menu-group>
        <div class="my-menu-sperator"></div>
        <context-menu-group label="Childs">
          <context-menu-item label="Item1-1" @click="alertContextMenuItemClicked('Item1-1')" />
          <context-menu-item label="Item1-2" @click="alertContextMenuItemClicked('Item1-2')" />
          <div class="my-menu-sperator"></div>
          <context-menu-group label="Childs">
            <context-menu-item label="Item2-1" @click="alertContextMenuItemClicked('Item2-1')" />
            <context-menu-item label="Item2-2" @click="alertContextMenuItemClicked('Item2-2')" />
          </context-menu-group>
        </context-menu-group>
      </context-menu-group>
    </context-menu>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { MenuOptions } from '../../library/ContextMenuDefine';

export default defineComponent({
  data() {
    return {
      clickItem: '',
      show: false,
      show2: false,
      options: {
        iconFontClass: 'iconfont',
        zIndex: 3,
        minWidth: 230,
        x: 500,
        y: 200
      } as MenuOptions,
      options2: {
        // The slot rendering submenu container is temporarily unavailable, 
        // but the custom class can be used to customize the style of the container
        customClass: "my-menu-box", 
        zIndex: 3,
        minWidth: 230,
        x: 500,
        y: 200
      } as MenuOptions,
    }
  },
  methods: {
    onContextMenu(e : MouseEvent) {
      e.preventDefault();
      //Set the mouse position
      this.options.x = e.x;
      this.options.y = e.y;
      //Show menu
      this.show = true;
    },
    onContextMenu2(e : MouseEvent) {
      e.preventDefault();
      //Set the mouse position
      this.options2.x = e.x;
      this.options2.y = e.y;
      //Show menu
      this.show2 = true;
    },
    alertContextMenuItemClicked(name: string) {
      this.clickItem = name;
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