import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'conversion',
      component: () => import('../views/ConversionView.vue')
    },
    {
      path: '/timeseries',
      name: 'timeseries',
      component: () => import('../views/TimeseriesView.vue')
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/HistoryView.vue')
    }
  ]
})

export default router
