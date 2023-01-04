/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  base: '/pages/vue3-context-menu-docs/',
  lang: 'zh-CN',
  title: 'vue3-context-menu',
  description: '一个使用 Vue3 制作的简洁美观简单的右键菜单组件',
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
      {
        text: '语言',
        items: [
          { text: '中文', link: 'https://imengyu.top/pages/vue3-context-menu-docs/' },
          { text: 'English', link: 'https://imengyu.top/pages/vue3-context-menu-docs/en/' }
        ]
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '起步',
          items: [
            { text: '安装', link: '/guide/install' },
            { text: '如何使用', link: '/guide/useage' },
            { text: '菜单图标', link: '/guide/icon' },
          ]
        },
        {
          text: '自定义',
          items: [
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
              ]
            },
          ]
        },
      ]
    }
  }
}

export default config