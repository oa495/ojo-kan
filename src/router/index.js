import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', component: () => import('../views/HomeView.vue')
    },
     {
      path: '/story', component: () => import('../views/StoryView.vue')
    },
    {
      path: '/about', component: () => import('../views/AboutView.vue')
    }
  ],
})

export default router
