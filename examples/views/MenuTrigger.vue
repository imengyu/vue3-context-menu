<template>
  <div class="box2">
    <h2>MenuTrigger Component Test</h2>

    <div style="margin-bottom: 16px;">
      <label>Position: </label>
      <select v-model="position">
        <option value="tl">tl (top-left)</option>
        <option value="t">t (top)</option>
        <option value="tr">tr (top-right)</option>
        <option value="bl">bl (bottom-left)</option>
        <option value="b">b (bottom)</option>
        <option value="br">br (bottom-right)</option>
        <option value="lt">lt (left-top)</option>
        <option value="l">l (left)</option>
        <option value="lb">lb (left-bottom)</option>
        <option value="rt">rt (right-top)</option>
        <option value="r">r (right)</option>
        <option value="rb">rb (right-bottom)</option>
      </select>
    </div>

    <h3>Hover Trigger</h3>
    <MenuTrigger trigger="hover" :position="(position as MenuPopDirection )">
      <button class="trigger-btn">Hover me</button>
      <template #menu="{ options, show, onClose }">
        <ContextMenu
          :options="{ ...menuData, ...options }"
          :show="show"
          @close="onClose()"
        >
          <ContextMenuItem label="Hover Item 1" @click="onMenuClick('Hover - Item 1')" />
          <ContextMenuItem label="Hover Item 2" @click="onMenuClick('Hover - Item 2')" />
        </ContextMenu>
      </template>
    </MenuTrigger>

    <h3>Click Trigger</h3>
    <MenuTrigger trigger="click" :position="(position as MenuPopDirection )">
      <button class="trigger-btn">Click me</button>
      <template #menu="{ options, show, onClose }">
        <ContextMenu
          :options="{ ...menuData, ...options }"
          :show="show"
          @close="onClose()"
        >
          <ContextMenuItem label="Option 1" @click="onMenuClick('Click - Option 1')" />
          <ContextMenuItem label="Option 2" @click="onMenuClick('Click - Option 2')" />
          <ContextMenuItem label="Option 3" @click="onMenuClick('Click - Option 3')" />
        </ContextMenu>
      </template>
    </MenuTrigger>

    <h3>Function mode (show event)</h3>
    <MenuTrigger trigger="click" :position="(position as MenuPopDirection )" @show="onFunctionShow">
      <button class="trigger-btn">Click (function mode)</button>
    </MenuTrigger>

    <div v-if="lastAction" style="margin-top: 20px; padding: 10px; background: #e8f5e9; border-radius: 4px;">
      Last action: {{ lastAction }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { ContextMenu, ContextMenuItem, MenuTrigger } from '../../library/index'
import ContextMenuInst from '../../library/ContextMenuInstance'
import type { MenuOptions, MenuPopDirection } from '../../library/ContextMenuDefine'

const lastAction = ref('')
const position = ref('bl')

onMounted(() => {
  position.value = localStorage.getItem('position') ?? 'bl'
})
watch(position, (v) => {
  localStorage.setItem('position', v)
})

const menuData = ref({
  x: 0,
  y: 0,
  items: [],
})

function onMenuClick(name: string) {
  lastAction.value = name
}

function onFunctionShow(pos: MenuOptions) {
  console.log(pos)
  lastAction.value = `Function show at (${pos.x.toFixed(0)}, ${pos.y.toFixed(0)})`
  ContextMenuInst.showContextMenu({
    ...pos,
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
