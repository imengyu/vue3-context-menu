<template>
  <div class="box2">
    <h2>MenuTrigger Component Test</h2>

    <h3>Click Trigger (position: bl)</h3>
    <MenuTrigger trigger="click" position="bl">
      <button class="trigger-btn">Click me</button>
      <template #menu="{ options: pos, show, onClose }">
        <ContextMenu
          :options="{ ...menuData, x: pos.x, y: pos.y }"
          :show="show"
          @close="onClose()"
        >
          <ContextMenuItem label="Option 1" @click="onMenuClick('Click - Option 1')" />
          <ContextMenuItem label="Option 2" @click="onMenuClick('Click - Option 2')" />
          <ContextMenuItem label="Option 3" @click="onMenuClick('Click - Option 3')" />
        </ContextMenu>
      </template>
    </MenuTrigger>

    <h3>Hover Trigger (position: br)</h3>
    <MenuTrigger trigger="hover" position="br">
      <button class="trigger-btn">Hover me</button>
      <template #menu="{ options: pos, show, onClose }">
        <ContextMenu
          :options="{ ...menuData, x: pos.x, y: pos.y }"
          :show="show"
          @close="onClose()"
        >
          <ContextMenuItem label="Hover Item 1" @click="onMenuClick('Hover - Item 1')" />
          <ContextMenuItem label="Hover Item 2" @click="onMenuClick('Hover - Item 2')" />
        </ContextMenu>
      </template>
    </MenuTrigger>

    <h3>Function mode (show event)</h3>
    <MenuTrigger trigger="click" position="bl" @show="onFunctionShow">
      <button class="trigger-btn">Click (function mode)</button>
    </MenuTrigger>

    <div v-if="lastAction" style="margin-top: 20px; padding: 10px; background: #e8f5e9; border-radius: 4px;">
      Last action: {{ lastAction }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ContextMenu, ContextMenuItem, MenuTrigger } from '../../library/index'
import ContextMenuInst from '../../library/ContextMenuInstance'

const lastAction = ref('')

const menuData = ref({
  x: 0,
  y: 0,
  items: [],
})

function onMenuClick(name: string) {
  lastAction.value = name
}

function onFunctionShow(pos: { x: number, y: number }) {
  lastAction.value = `Function show at (${pos.x.toFixed(0)}, ${pos.y.toFixed(0)})`
  ContextMenuInst.showContextMenu({
    x: pos.x,
    y: pos.y,
    items: [
      { label: 'Function Item 1', onClick: () => { lastAction.value = 'Function - Item 1' } },
      { label: 'Function Item 2', onClick: () => { lastAction.value = 'Function - Item 2' } },
    ],
  })
}
</script>

<style scoped>
.trigger-btn {
  padding: 8px 16px;
  cursor: pointer;
  border: 1px solid #1a7ff1;
  background: #e3f2fd;
  border-radius: 4px;
  font-size: 14px;
}
.trigger-btn:hover {
  background: #bbdefb;
}
</style>
