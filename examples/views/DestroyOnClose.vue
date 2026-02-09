<template>
  <div class="box2">
    <h2>Component DestroyOnClose Test</h2>
    <p>Right click the box below to see the context menu.</p>
    <p>Check the console to see mount/unmount logs.</p>
    <div 
      class="box1" 
      style="margin-top: 20px"
      @contextmenu="onContextMenu"
    >
      Right click me
    </div>

    <div style="margin-top: 20px">
      <label>
        <input type="checkbox" v-model="destroyOnClose">
        destroy-on-close (Default: true)
      </label>
    </div>

    <ContextMenu
      v-model:show="show"
      :options="options"
      :destroy-on-close="destroyOnClose"
    >
      <ContextMenuItem>
        <TestComponent name="Menu Item 1" />
      </ContextMenuItem>
      <ContextMenuItem>
        <TestComponent name="Menu Item 2" />
      </ContextMenuItem>
    </ContextMenu>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineComponent, onMounted, onUnmounted, h } from 'vue'
import { ContextMenu, ContextMenuItem } from '../../library/index'

const show = ref(false)
const destroyOnClose = ref(false)
const options = ref({
  x: 0,
  y: 0
})

const TestComponent = defineComponent({
  props: ['name'],
  setup(props) {
    onMounted(() => {
      console.log(`[TestComponent] ${props.name} mounted`)
    })
    onUnmounted(() => {
      console.log(`[TestComponent] ${props.name} unmounted`)
    })
    return () => h('div', props.name)
  },

})

function onContextMenu(e: MouseEvent) {
  e.preventDefault()
  show.value = true
  options.value.x = e.x
  options.value.y = e.y
}
</script>
