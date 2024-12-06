import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'
import App from './App.vue'
import { createApp } from 'vue'

createApp(App).use(ContextMenu).mount('#app')