/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  lang: 'en-US',
  title: 'vue3-context-menu',
  description: 'A simple, beautiful and simple context menu component made by Vue3',
  base: '/pages/vue3-context-menu-docs/en/',
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/imengyu/vue3-context-menu' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022 imengyu.top'
    },
    nav: [
      { text: 'Guide', link: '/guide/install' },
      { text: 'API Reference', link: '/api/ContextMenu' },
      { text: 'Changelog', link: '/change/index' },
      {
        text: 'Language',
        items: [
          { text: '中文', link: 'https://imengyu.top/pages/vue3-context-menu-docs/' },
          { text: 'English', link: '/' }
        ]
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Start',
          items: [
            { text: 'Install', link: '/guide/install' },
            { text: 'Useage', link: '/guide/useage' },
            { text: 'Menu icon', link: '/guide/icon' },
          ]
        },
        {
          text: 'Customize',
          items: [
            { text: 'Customize Styles and Rendering', link: '/guide/customize' },
            { text: 'Customize the menu mount container', link: '/guide/custom-container' },
          ]
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Function mode', link: '/api/ContextMenuInstance' },
            { 
              text: 'Component mode',
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