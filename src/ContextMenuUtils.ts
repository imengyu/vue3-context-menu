import { defineComponent, toRefs, VNode } from "vue";

export function getTop(e: HTMLElement): number {
  let offset = e.offsetTop;
  if (e.offsetParent != null) {
    offset -= e.offsetParent.scrollTop;
    offset += getTop(e.offsetParent as HTMLElement);
  }
  return offset;
}
export function getLeft(e: HTMLElement): number {
  let offset = e.offsetLeft;
  if (e.offsetParent != null) {
    offset -= e.offsetParent.scrollLeft;
    offset += getLeft(e.offsetParent as HTMLElement);
  }

  return offset;
}

export function transformMenuPosition(e: HTMLElement, offsetX: number, offsetY: number): {
  x: number,
  y: number,
} {
  return {
    x: getLeft(e) + offsetX,
    y: getTop(e) + offsetY,
  };
}

/**
 * Render a VNode
 */
export const VNodeRender = defineComponent({
  props: {
    vnode: {
      type: [ Object, Function ],
      default: null,
    },
    data: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const { vnode, data } = toRefs(props);
    return () => typeof vnode.value === 'function' ? (vnode.value as unknown as (data: unknown) => VNode)(data.value) : vnode.value as unknown as VNode;
  },
})