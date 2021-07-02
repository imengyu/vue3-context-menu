import { createApp } from 'vue'
import App from './App.vue'
import './css/iconfont.css'

import ContextMenu from '../src/ContextMenuInstance'

createApp(App)
  .use(ContextMenu)
  .mount('#app')
