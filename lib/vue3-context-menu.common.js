module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "6b0d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// runtime helper for setting properties on components
// in a tree-shakable way
exports.default = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
        target[key] = val;
    }
    return target;
};


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ "95c7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ContextSubMenu_vue_vue_type_style_index_0_id_59f807de_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f26c");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ContextSubMenu_vue_vue_type_style_index_0_id_59f807de_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_v16_dist_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_v16_dist_index_js_ref_1_1_ContextSubMenu_vue_vue_type_style_index_0_id_59f807de_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "f26c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");

// CONCATENATED MODULE: ./src/ContextMenuDefine.ts
const MenuConstOptions = {
  defaultMinWidth: 100,
  defaultMaxWidth: 600,
  defaultStartZindex: 1
};
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/vue-loader-v16/dist/templateLoader.js??ref--6!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/ContextSubMenu.vue?vue&type=template&id=59f807de&ts=true


const _hoisted_1 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "mx-right-arrow"
}, null, -1);

const _hoisted_2 = [_hoisted_1];

const _hoisted_3 = /*#__PURE__*/Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", {
  class: "mx-right-arrow"
}, null, -1);

const _hoisted_4 = [_hoisted_3];
const _hoisted_5 = ["onMouseenter", "onFocus", "onClick"];
const _hoisted_6 = {
  class: "text"
};
const _hoisted_7 = {
  key: 0,
  class: "mx-right-arrow"
};
const _hoisted_8 = {
  key: 0,
  class: "mx-context-menu-item-sperator"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_ContextSubMenu = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["resolveComponent"])("ContextSubMenu", true);

  return _ctx.items ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
    key: 0,
    class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])('mx-context-menu ' + (_ctx.options.customClass ? _ctx.options.customClass : '') + (_ctx.menuReady ? ' ready' : '')),
    style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
      maxWidth: _ctx.parentItem && _ctx.parentItem.maxWidth ? `${_ctx.parentItem.maxWidth}px` : `${_ctx.constOptions.defaultMaxWidth}px`,
      minWidth: _ctx.parentItem && _ctx.parentItem.minWidth ? `${_ctx.parentItem.minWidth}px` : `${_ctx.constOptions.defaultMinWidth}px`,
      zIndex: _ctx.zIndex,
      left: `${_ctx.position.x}px`,
      top: `${_ctx.position.y}px`
    }),
    onMouseenter: _cache[4] || (_cache[4] = //@ts-ignore
    (...args) => _ctx.onMenuMouseEnter && _ctx.onMenuMouseEnter(...args)),
    onMouseleave: _cache[5] || (_cache[5] = $event => _ctx.onMenuMouseLeave($event))
  }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    class: "mx-context-menu-updown up",
    onClick: _cache[0] || (_cache[0] = $event => _ctx.onScroll(false))
  }, _hoisted_2, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.menuOverflow]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["withDirectives"])(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    class: "mx-context-menu-updown down",
    onClick: _cache[1] || (_cache[1] = $event => _ctx.onScroll(true))
  }, _hoisted_4, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_["vShow"], _ctx.menuOverflow]]), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
    class: "mx-context-menu-items",
    ref: "menu",
    style: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeStyle"])({
      maxHeight: _ctx.maxHeight > 0 ? `${_ctx.maxHeight}px` : ''
    })
  }, [(Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(true), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])(external_commonjs_vue_commonjs2_vue_root_Vue_["Fragment"], null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["renderList"])(_ctx.items, (item, i) => {
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", {
      key: i
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("div", {
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])('mx-context-menu-item' + (item.disabled ? ' disabled' : '')),
      onMouseenter: $event => _ctx.showChildItem($event, item),
      onMouseleave: _cache[2] || (_cache[2] = $event => _ctx.hideChildItem()),
      onFocus: $event => _ctx.showChildItem($event, item),
      onBlur: _cache[3] || (_cache[3] = $event => _ctx.hideChildItem()),
      onClick: $event => _ctx.onMouseClick(item)
    }, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", _hoisted_6, [Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("i", {
      class: Object(external_commonjs_vue_commonjs2_vue_root_Vue_["normalizeClass"])(item.icon + ' icon ' + _ctx.options.iconFontClass)
    }, null, 2), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementVNode"])("span", null, Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toDisplayString"])(item.label), 1), item.children && item.children.length > 0 ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("span", _hoisted_7)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)])], 42, _hoisted_5), item.divided ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createElementBlock"])("div", _hoisted_8)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)]);
  }), 128))], 4), _ctx.activeItem && _ctx.activeItem.children ? (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["openBlock"])(), Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createBlock"])(_component_ContextSubMenu, {
    key: 0,
    ref: "childMenu",
    zIndex: _ctx.zIndex + 1,
    items: _ctx.activeItem.children,
    parentItem: _ctx.activeItem,
    options: _ctx.options,
    globalData: _ctx.childGlobalData,
    position: _ctx.childPosition,
    onClose: _ctx.onChildrenClose,
    onKeepOpen: _ctx.onChildrenKeepOpen,
    onPreUpdatePos: _ctx.onChildrenUpdatePos
  }, null, 8, ["zIndex", "items", "parentItem", "options", "globalData", "position", "onClose", "onKeepOpen", "onPreUpdatePos"])) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true)], 38)) : Object(external_commonjs_vue_commonjs2_vue_root_Vue_["createCommentVNode"])("", true);
}
// CONCATENATED MODULE: ./src/ContextSubMenu.vue?vue&type=template&id=59f807de&ts=true

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/ContextSubMenu.vue?vue&type=script&lang=ts


/* harmony default export */ var ContextSubMenuvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  name: 'ContextSubMenu',
  props: {
    items: {
      type: Object,
      default: null
    },
    parentItem: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    },
    zIndex: {
      type: Number,
      default: 0
    },
    globalData: {
      type: Object,
      default: null
    },
    position: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'keepOpen', 'preUpdatePos'],

  setup(prop, context) {
    const {
      globalData,
      position,
      options,
      parentItem
    } = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["toRefs"])(prop);
    const menu = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])();
    const childMenu = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])();
    const menuReady = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(false);
    const menuOverflow = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(false);
    let nextShouldHideItem = null;
    const maxHeight = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(0);
    const activeItem = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])(null);
    const childGlobalData = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])({
      parentPosition: {
        x: 0,
        y: 0
      },
      screenSize: globalData.value.screenSize
    });
    const childPosition = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["ref"])({
      x: 0,
      y: 0
    }); //显示和隐藏子菜单

    function showChildItem(e, item) {
      if (item.disabled || !item.children || item.children.length == 0) return;
      if (activeItem.value === item) return; //同步父菜单的位置

      activeItem.value = item;
      childGlobalData.value.parentPosition.x = globalData.value.parentPosition.x + position.value.x;
      childGlobalData.value.parentPosition.y = globalData.value.parentPosition.y + position.value.y; //计算子菜单的位置

      if (menu.value) childPosition.value.x = menu.value.offsetWidth + (options.value.xOffset || 0);
      const currentItemEle = e.target;
      if (currentItemEle) childPosition.value.y = currentItemEle.offsetTop + (options.value.yOffset || 0);
    }

    function hideChildItem() {
      nextShouldHideItem = activeItem.value;
      setTimeout(() => {
        if (nextShouldHideItem === activeItem.value) activeItem.value = null;
      });
    }

    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["watch"])(activeItem, (newV, oldV) => {
      if (newV && oldV) {
        setTimeout(() => {
          if (childMenu.value) childMenu.value.doCheckPos();
        }, 50);
      }
    }); //子菜单事件

    function onChildrenClose(byUserClick) {
      hideChildItem();
      if (byUserClick) context.emit('close', true);
    }

    function onChildrenKeepOpen(item) {
      if (nextShouldHideItem === item) nextShouldHideItem = null;
      context.emit('keepOpen', parentItem.value);
    }

    function onChildrenUpdatePos(newPos) {
      childPosition.value.x = newPos.x;
      childPosition.value.y = newPos.y;
    } //鼠标事件


    function onMouseClick(item) {
      if (!item.disabled) {
        if (typeof item.onClick === 'function') {
          item.onClick();
          context.emit('close', true);
        } else if (!item.children || item.children.length === 0) {
          context.emit('close', true);
        }
      }
    }

    function onMenuMouseEnter() {
      context.emit('keepOpen', parentItem.value);
    }

    function onMenuMouseLeave(e) {
      if (e.relatedTarget != null) context.emit('close', false);
    } //滚动


    function onScroll(down) {
      if (menu.value) {
        menu.value.scrollTop += down ? 30 : -30;
      }
    }

    let solveOverflowTimeOut = 0; //检查菜单是否超出屏幕

    function doCheckPos() {
      const _menu = menu.value;
      const _globalData = globalData.value;

      if (_menu) {
        const newPos = {
          x: position.value.x,
          y: position.value.y
        }; //如果X绝对位置超出屏幕，那么减去超出的宽度

        const absRight = _globalData.parentPosition.x + position.value.x + _menu.offsetWidth;

        if (absRight > _globalData.screenSize.w) {
          newPos.x -= absRight - _globalData.screenSize.w;
        } //如果高度超出屏幕，那么限制最高高度


        if (_menu.offsetHeight > _globalData.screenSize.h - 30) {
          maxHeight.value = _globalData.screenSize.h - 30; //  强制限制Y坐标为0

          newPos.y = -_globalData.parentPosition.y;
          menuOverflow.value = true;
        } else {
          menuOverflow.value = false;
          maxHeight.value = 0; //如果Y绝对位置超出屏幕，那么减去超出的高度

          const absTop = _globalData.parentPosition.y + position.value.y + _menu.offsetHeight;

          if (absTop > _globalData.screenSize.h) {
            newPos.y -= absTop - _globalData.screenSize.h + 30;
          }
        }

        context.emit('preUpdatePos', newPos);
        menuReady.value = true;
      }
    }

    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["onMounted"])(() => {
      solveOverflowTimeOut = window.setTimeout(() => doCheckPos(), 100);
    });
    Object(external_commonjs_vue_commonjs2_vue_root_Vue_["onBeforeUnmount"])(() => {
      if (solveOverflowTimeOut > 0) {
        clearTimeout(solveOverflowTimeOut);
        solveOverflowTimeOut = 0;
      }
    });
    return {
      menu,
      menuOverflow,
      childMenu,
      menuReady,
      maxHeight,
      showChildItem,
      hideChildItem,
      onChildrenClose,
      onChildrenKeepOpen,
      onChildrenUpdatePos,
      onMenuMouseLeave,
      onMenuMouseEnter,
      onMouseClick,
      onScroll,
      doCheckPos,
      activeItem,
      childGlobalData,
      childPosition,
      constOptions: MenuConstOptions
    };
  }

}));
// CONCATENATED MODULE: ./src/ContextSubMenu.vue?vue&type=script&lang=ts
 
// EXTERNAL MODULE: ./src/ContextSubMenu.vue?vue&type=style&index=0&id=59f807de&lang=css
var ContextSubMenuvue_type_style_index_0_id_59f807de_lang_css = __webpack_require__("95c7");

// EXTERNAL MODULE: ./node_modules/vue-loader-v16/dist/exportHelper.js
var exportHelper = __webpack_require__("6b0d");
var exportHelper_default = /*#__PURE__*/__webpack_require__.n(exportHelper);

// CONCATENATED MODULE: ./src/ContextSubMenu.vue







const __exports__ = /*#__PURE__*/exportHelper_default()(ContextSubMenuvue_type_script_lang_ts, [['render',render]])

/* harmony default export */ var ContextSubMenu = (__exports__);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--15-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/ts-loader??ref--15-3!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader-v16/dist??ref--1-1!./src/ContextMenu.vue?vue&type=script&lang=ts



/* harmony default export */ var ContextMenuvue_type_script_lang_ts = (Object(external_commonjs_vue_commonjs2_vue_root_Vue_["defineComponent"])({
  name: 'ContextMenu',
  emits: ['update:show', 'close'],
  props: {
    options: {
      type: Object,
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
        y: 0
      }
    };
  },

  mounted() {
    this.updateCurrentShowPos();
    setTimeout(() => {
      document.addEventListener("click", this.close);
      document.addEventListener("contextmenu", this.close);
    }, 100);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.close);
  },

  watch: {
    show(v) {
      if (v) this.updateCurrentShowPos();
    }

  },

  render() {
    if (!this.show) return [];
    return Object(external_commonjs_vue_commonjs2_vue_root_Vue_["h"])(ContextSubMenu, {
      items: this.options.items,
      parentItem: {
        maxWidth: this.options.maxWidth || MenuConstOptions.defaultMaxWidth,
        minWidth: this.options.minWidth || MenuConstOptions.defaultMinWidth
      },
      options: this.options,
      zIndex: this.options.zIndex || MenuConstOptions.defaultStartZindex,
      globalData: {
        parentPosition: {
          x: 0,
          y: 0
        },
        screenSize: {
          w: document.body.clientWidth,
          h: document.body.clientHeight
        }
      },
      position: this.currentShowPos,
      onClose: this.onChildrenClose,
      onPreUpdatePos: this.onChildrenUpdatePos
    });
  },

  methods: {
    updateCurrentShowPos() {
      this.currentShowPos.x = this.options.x;
      this.currentShowPos.y = this.options.y;
    },

    close() {
      this.$emit("update:show", false);
      this.$emit("close");
    },

    onChildrenClose(byUserClick) {
      if (byUserClick) {
        this.$emit('close');
        this.$emit('update:show', false);
      }
    },

    onChildrenUpdatePos(newPos) {
      this.currentShowPos.x = newPos.x;
      this.currentShowPos.y = newPos.y;
    }

  }
}));
// CONCATENATED MODULE: ./src/ContextMenu.vue?vue&type=script&lang=ts
 
// CONCATENATED MODULE: ./src/ContextMenu.vue



const ContextMenu_exports_ = ContextMenuvue_type_script_lang_ts;

/* harmony default export */ var ContextMenu = (ContextMenu_exports_);
// CONCATENATED MODULE: ./src/ContextMenuInstance.ts




const genContainer = () => {
  return document.createElement('div');
};

const initInstance = (options, container) => {
  const vnode = Object(external_commonjs_vue_commonjs2_vue_root_Vue_["h"])(ContextMenu, {
    options: options,
    show: true,
    onClose: () => {
      Object(external_commonjs_vue_commonjs2_vue_root_Vue_["render"])(null, container);
    }
  });
  Object(external_commonjs_vue_commonjs2_vue_root_Vue_["render"])(vnode, container);
  document.body.appendChild(container.firstElementChild);
  return vnode.component;
};

const $contextmenu = options => {
  const container = genContainer();
  initInstance(options, container);
};

/* harmony default export */ var ContextMenuInstance = ({
  install(app) {
    app.config.globalProperties.$contextmenu = $contextmenu;
    app.component('ContextMenu', ContextMenu);
    app.component('ContextSubMenu', ContextSubMenu);
  },

  showContextMenu(options) {
    $contextmenu(options);
  }

});
// CONCATENATED MODULE: ./index.js


/* harmony default export */ var index = (ContextMenuInstance);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (index);



/***/ })

/******/ });
//# sourceMappingURL=vue3-context-menu.common.js.map