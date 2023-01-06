<script lang="ts">
import { defineComponent, h, onBeforeUnmount, PropType, ref, render, toRefs, VNode, watch } from 'vue'
import { MenuOptions } from './ContextMenuDefine'
import { genContainer, removeContainer } from "./ContextMenuUtils";
import ContextSubMenuWrapperConstructor from './ContextSubMenuWrapper.vue'

export type GlobalHasSlot = (name: string) => boolean;
export type GlobalRenderSlot = (name: string, params: Record<string, unknown>) => VNode;

/**
 * Context menu component
 */
export default defineComponent({
  name: 'ContextMenu',
  emits: [ 'update:show', 'close' ],
  props: {
    /**
     * Menu options
     */
    options: {
      type: Object as PropType<MenuOptions>,
      default: null
    },
    /**
     * Show menu?
     */
    show: {
      type: Boolean,
      default: false
    },
  },
  setup(props, ctx) {

    const {
      options,
      show,
    } = toRefs(props);

    let currentContainer = null as HTMLElement|null; 
    let currentContainerIsNew = false; 

    function openMenu() {
      const { container, isNew } = genContainer(options.value);
      const vnode = h(ContextSubMenuWrapperConstructor as unknown as string, { 
        options: options,
        show: show.value,
        container: container,
        'onUpdate:show': (v: boolean) => ctx.emit('update:show', v),
        onClose: () => {
          render(null, container);
          ctx.emit('close')
        },
      }, ctx.slots);

      currentContainerIsNew = isNew;
      currentContainer = container;
      render(vnode, container);
    }
    function closeMenu() {            
      if (currentContainer) {
        if (currentContainerIsNew)
          removeContainer(currentContainer);
        currentContainer = null;
      }
    }

    watch(show, (v) => {
      if (v)
        openMenu();
      else
        closeMenu();
    });
    watch(options, () => {
      if (show.value) {
        closeMenu();
        openMenu();
      }
    });

    return () => {      
      return [];
    }
  },
})
</script>
