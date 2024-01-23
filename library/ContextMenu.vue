<script lang="ts">
import { defineComponent, h, Teleport, toRefs } from 'vue'
import type { PropType, VNode } from 'vue'
import type { MenuOptions } from './ContextMenuDefine'
import { genContainer } from "./ContextMenuUtils";
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

    ctx.expose({
      closeMenu: () => ctx.emit('update:show', false),
      isClosed: () => !show.value,
    });

    return () => {  
      const { isNew, container, eleId } = genContainer(options.value);
      
      return [
        h(
          Teleport,
          { to: `#${eleId}` },
          [
            h(ContextSubMenuWrapperConstructor as unknown as string, { 
              options: options,
              show: show,
              container: container,
              isFullScreenContainer: !isNew,
              onClose: (fromItem: undefined) => {
                ctx.emit('update:show', false);
                ctx.emit('close');
                options.value.onClose?.(fromItem);
              },
            }, ctx.slots)
          ]
        )
      ];
    }
  },
})
</script>
