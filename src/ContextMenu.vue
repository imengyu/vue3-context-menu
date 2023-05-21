<script lang="ts">
import { defineComponent, h, PropType, Teleport, toRefs, VNode } from 'vue'
import { MenuOptions } from './ContextMenuDefine'
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
    });

    return () => {  
      const { isNew, container, eleId } = genContainer(options.value);
      const vnode = show.value ? [ h(ContextSubMenuWrapperConstructor as unknown as string, { 
        options: options,
        show: true,
        container: container,
        isFullScreenContainer: !isNew,
        'onUpdate:show': (v: boolean) => ctx.emit('update:show', v),
        onClose: () => {
          ctx.emit('update:show', false);
          ctx.emit('close');
          options.value.onClose?.();
        },
      }, ctx.slots) ] : [];
      
      return [
        h(
          Teleport,
          { to: `#${eleId}` },
          vnode
        )
      ];
    }
  },
})
</script>
