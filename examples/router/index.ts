import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import BasicComponent from '../views/BasicComponent.vue'
import BasicCustomize from '../views/BasicCustomize.vue'
import BasicUseage from '../views/BasicUseage.vue'
import Theme from '../views/Theme.vue'
import ComponentCustomize from '../views/ComponentCustomize.vue'
import MenuBar from '../views/MenuBar.vue'
import ChangeContainer from '../views/ChangeContainer.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/BasicComponent',
    name: 'BasicComponent',
    component: BasicComponent,
  },
  {
    path: '/BasicCustomize',
    name: 'BasicCustomize',
    component: BasicCustomize,
  },
  {
    path: '/ComponentCustomize',
    name: 'ComponentCustomize',
    component: ComponentCustomize,
  },
  {
    path: '/',
    name: 'BasicUseage',
    component: BasicUseage,
  },
  {
    path: '/Theme',
    name: 'Theme',
    component: Theme,
  },
  {
    path: '/MenuBar',
    name: 'MenuBar',
    component: MenuBar,
  },
  {
    path: '/ChangeContainer',
    name: 'ChangeContainer',
    component: ChangeContainer,
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
