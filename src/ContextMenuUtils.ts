import { defineComponent, toRefs, VNode } from "vue";
import { MenuConstOptions, MenuOptions } from "./ContextMenuDefine";

export function getTop(e: HTMLElement, stopNode?: HTMLElement): number {
  let offset = e.offsetTop;
  if (e.offsetParent != null && e.offsetParent != stopNode) {
    offset -= e.offsetParent.scrollTop;
    offset += getTop(e.offsetParent as HTMLElement, stopNode);
  }
  return offset;
}
export function getLeft(e: HTMLElement, stopNode?: HTMLElement): number {
  let offset = e.offsetLeft;
  if (e.offsetParent != null && e.offsetParent != stopNode) {
    offset -= e.offsetParent.scrollLeft;
    offset += getLeft(e.offsetParent as HTMLElement, stopNode);
  }
  return offset;
}

export function transformMenuPosition(e: HTMLElement, offsetX: number, offsetY: number, container?: HTMLElement): {
  x: number,
  y: number,
} {
  return {
    x: getLeft(e, container) + offsetX,
    y: getTop(e, container) + offsetY,
  };
}


export function removeContainer(container: HTMLElement) :void {
  container.parentNode?.removeChild(container);
}
export function genContainer(options: MenuOptions) : {
  container: HTMLElement,
  isNew: boolean,
} {
  const { getContainer, zIndex } = options;

  if (getContainer) {
    const container = typeof getContainer === 'function' ? getContainer() : getContainer;
    if (container) {
      container.style.zIndex = zIndex?.toString() || MenuConstOptions.defaultZindex.toString();
      return {
        container,
        isNew: false,
      };
    }
  }

  const container = document.createElement('div');
  container.setAttribute('class', 'mx-menu-ghost-host');
  container.style.zIndex = zIndex?.toString() || MenuConstOptions.defaultZindex.toString();
  document.body.appendChild(container);
  return {
    container,
    isNew: true,
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