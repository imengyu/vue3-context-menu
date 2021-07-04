<script lang="ts">
import { defineComponent, h, PropType } from 'vue'
import { ContextMenuGlobalData, ContextMenuPositionData, MenuConstOptions, MenuItem, MenuOptions } from './ContextMenuDefine'
import ContextSubMenuConstructor from './ContextSubMenu.vue';

export default defineComponent({
  name: 'ContextMenu',
  emits: [ 'update:show', 'close' ],
  props: {
    options: {
      type: Object as PropType<MenuOptions>,
      default: null
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentShowPos: {
        x: 0,
        y: 0,
      } as ContextMenuPositionData
    }
  },
  mounted() {
    this.updateCurrentShowPos();
  },
  watch: {
    show(v : boolean) {
      if(v) this.updateCurrentShowPos();
    } 
  },
  render() {
    return h('div', {
      class: 'mx-context-menu-host',
      style: {
        display: this.show ? 'block' : 'none'
      },
      onMouseUp: this.onHostMouseUp,
    }, [
      h(ContextSubMenuConstructor, {
        items: this.options.items,
        parentItem: {
          maxWidth: this.options.maxWidth || MenuConstOptions.defaultMaxWidth,
          minWidth: this.options.minWidth || MenuConstOptions.defaultMinWidth,
        } as MenuItem,
        options: this.options,
        zIndex: this.options.zIndex || MenuConstOptions.defaultStartZindex,    
        globalData: {
          parentPosition: {
            x: 0,
            y: 0,
          },
          screenSize: {
            w: window.innerWidth,
            h: window.innerHeight,
          }
        } as ContextMenuGlobalData,
        position: this.currentShowPos as ContextMenuPositionData,
        onClose: this.onChidrenClose,
        onPreUpdatePos: this.onChidrenUpdatePos,
      })
    ])
  },
  methods: {
    updateCurrentShowPos() {
      this.currentShowPos.x = this.options.x;
      this.currentShowPos.y = this.options.y;
    },
    onHostMouseUp(e : MouseEvent) {
      if((e.target as HTMLElement).className === 'mx-context-menu-host') {
        this.$emit('update:show', false);
        this.$emit('close');
      }
    },
    onChidrenClose(byUserClick : boolean) {
      if(byUserClick) {
        this.$emit('close');
        this.$emit('update:show', false);
      }
    },
    onChidrenUpdatePos(newPos: ContextMenuPositionData) {
      this.currentShowPos.x = newPos.x;
      this.currentShowPos.y = newPos.y;
    },
  }
})
</script>

<style>
.mx-context-menu-host {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1024;
  overflow: hidden;
}
</style>
