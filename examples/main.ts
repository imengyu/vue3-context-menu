import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './css/iconfont.css'

import ContextMenu from '../library/ContextMenuInstance'

createApp(App)
  .use(router)
  .use(ContextMenu)
  .mount('#app')
