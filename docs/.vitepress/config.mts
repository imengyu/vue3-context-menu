import { defineConfig } from 'vitepress';
import { renderSandbox } from 'vitepress-plugin-sandpack';
import container from 'markdown-it-container';

export default defineConfig({
  base: '/pages/vue3-context-menu-docs/',
  lang: 'zh-CN',
  title: 'vue3-context-menu',
  description: '一个使用 Vue3 制作的简洁美观简单的右键菜单组件',
  locales: {
    root: {
      label: '中文',
      lang: 'zh',
    },
    en: {
      label: 'English',
      lang: 'en', 
      description: 'A simple, beautiful and simple context menu component made by Vue3',  
      themeConfig: {
        socialLinks: [
          { icon: 'github', link: 'https://github.com/imengyu/vue3-context-menu' },
        ],
        footer: {
          message: 'Released under the MIT License.',
          copyright: 'Copyright © 2022 imengyu.top'
        },
        nav: [
          { text: 'Guide', link: '/en/guide/install' },
          { text: 'API Reference', link: '/en/api/ContextMenu' },
          { text: 'Changelog', link: '/en/change/index' },
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: 'Start',
              items: [
                { text: 'Install', link: '/en/guide/install' },
                { text: 'Useage', link: '/en/guide/useage' },
                { text: 'Menu icon', link: '/en/guide/icon' },
              ]
            },
            {
              text: 'Theme and Customize',
              items: [
                { text: 'Theme', link: '/en/guide/theme' },
                { text: 'Customize Styles and Rendering', link: '/en/guide/customize' },
                { text: 'Customize the menu mount container', link: '/en/guide/custom-container' },
              ]
            },
          ],
          '/en/api/': [
            {
              text: 'API Reference',
              items: [
                { text: 'Function mode', link: '/en/api/ContextMenuInstance' },
                { 
                  text: 'Component mode',
                  items: [
                    { text: 'ContextMenu', link: '/en/api/ContextMenu' },
                    { text: 'ContextMenuGroup', link: '/en/api/ContextMenuGroup' },
                    { text: 'ContextMenuItem', link: '/en/api/ContextMenuItem' },
                    { text: 'ContextMenuSeparator', link: '/en/api/ContextMenuSeparator' },
                    { text: 'MenuBar', link: '/en/api/MenuBar' },
                  ]
                },
              ]
            },
          ]
        }
      }
    },
  },
  themeConfig: {
    socialLinks: [
      { 
        icon: {
          svg: '<svg role="img" viewBox="0 0 1024 1024"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z"/></svg>'
        },
        link: 'https://gitee.com/imengyu/vue3-context-menu'
      },
      { icon: 'github', link: 'https://github.com/imengyu/vue3-context-menu' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022 imengyu.top'
    },
    nav: [
      { text: '教程', link: '/guide/install' },
      { text: 'API 参考', link: '/api/ContextMenu' },
      { text: '更新日志', link: '/change/index' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '起步',
          items: [
            { text: '开始之前', link: '/guide/start' },
            { text: '安装', link: '/guide/install' },
            { text: '如何使用', link: '/guide/useage' },
            { text: '菜单图标', link: '/guide/icon' },
          ]
        },
        {
          text: '美化与自定义',
          items: [
            { text: '主题', link: '/guide/theme' },
            { text: '自定义样式和渲染', link: '/guide/customize' },
            { text: '自定义菜单挂载容器', link: '/guide/custom-container' },
          ]
        },
      ],
      '/api/': [
        {
          text: 'API 参考',
          items: [
            { text: '函数模式', link: '/api/ContextMenuInstance' },
            { 
              text: '组件模式',
              items: [
                { text: 'ContextMenu', link: '/api/ContextMenu' },
                { text: 'ContextMenuGroup', link: '/api/ContextMenuGroup' },
                { text: 'ContextMenuItem', link: '/api/ContextMenuItem' },
                { text: 'ContextMenuSeparator', link: '/api/ContextMenuSeparator' },
                { text: 'MenuBar', link: '/api/MenuBar' },
              ]
            },
          ]
        },
      ]
    },
  },  
  markdown: {
    config(md) {
      md
        // the second parameter is html tag name
        .use(container, 'sandbox', {
          render (tokens, idx) {
            return renderSandbox(tokens, idx, 'sandbox');
          },
        })
        .use(container, 'my-sandbox', {
          render (tokens, idx) {
            return renderSandbox(tokens, idx, 'my-sandbox');
          },
        });
    },
  },
});