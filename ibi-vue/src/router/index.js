import { createRouter, createWebHistory } from 'vue-router'
import { nextTick } from 'vue'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: 'Home' },
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/gallery',
    name: 'gallery',
    meta: { title: 'Gallery' },
    component: () => import('../views/GalleryView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    meta: { title: 'Contact' },
    component: () => import('../views/ContactView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const DEFAULT_TITLE = 'IBI'
router.afterEach((to) => {
  nextTick(() => {
    document.title = DEFAULT_TITLE + (to.meta.title ? ' | ' + to.meta.title : '')
  })
})
router.beforeEach(async (to) => {
  if (to.matched == null || to.matched.length == 0) {
    return { name: 'home' }
  }
})
export default router
