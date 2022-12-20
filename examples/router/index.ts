import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import BasicComponent from '../views/BasicComponent.vue'
import BasicCustomize from '../views/BasicCustomize.vue'
import BasicUseage from '../views/BasicUseage.vue'
import Theme from '../views/Theme.vue'
import ComponentCustomize from '../views/ComponentCustomize.vue'
import InScaledBody from '../views/InScaledBody.vue'

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
    path: '/InScaledBody',
    name: 'InScaledBody',
    component: InScaledBody,
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
