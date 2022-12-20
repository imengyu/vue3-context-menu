import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    name: 'vue3-context-menu',
  },
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en', name: 'English' },
  ],
  base: '/pages/vue3-context-menu-docs/',
  publicPath: '/pages/vue3-context-menu-docs/',
});
