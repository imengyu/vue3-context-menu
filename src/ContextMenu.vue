<script lang="ts">
import { defineComponent, h, onBeforeUnmount, PropType, render, toRefs, VNode, watch } from 'vue'
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

    let { container, isNew } = genContainer(options.value);

    watch(show, (v) => {
      if (v) {
        if (isNew)
          removeContainer(container);
        const v = genContainer(options.value);
        container = v.container;
        isNew = v.isNew;
      }
    });

    onBeforeUnmount(() => {
      render(null, container);
      if (isNew)
        removeContainer(container);
    })

    return () => {
      const vnode = h(ContextSubMenuWrapperConstructor as unknown as string, { 
        options: options,
        show: show.value,
        container: container,
        'onUpdate:show': (v: boolean) => ctx.emit('update:show', v),
        onClose: () => ctx.emit('close'),
      }, ctx.slots.default);

      return render(vnode, container);
    }
  },
})
</script>
