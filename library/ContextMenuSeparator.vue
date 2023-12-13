<template>
  <VNodeRender v-if="globalHasSlot('separatorRender')" :vnode="() => globalRenderSlot('separatorRender', {})" />
  <div v-else class="mx-context-menu-item-sperator mx-context-no-clickable"></div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
import { VNodeRender } from './ContextMenuUtils';
import type { GlobalHasSlot, GlobalRenderSlot } from './ContextSubMenuWrapper.vue';

export default defineComponent({
  name: 'ContextMenuSperator',
  components: {
    VNodeRender
  },
  setup() {
      
    const globalHasSlot = inject('globalHasSlot') as GlobalHasSlot;
    const globalRenderSlot = inject('globalRenderSlot') as GlobalRenderSlot;

    return {
      globalHasSlot,
      globalRenderSlot,
    };
  },
})
</script>