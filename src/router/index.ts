import AboutPage from '@/pages/AboutPage.vue'
import CalculatorPage from '@/pages/CalculatorPage.vue'
import CounterPage from '@/pages/CounterPage.vue'
import HomePage from '@/pages/HomePage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import TicTacToePage from '@/pages/TicTacToePage.vue'
import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/about', name: 'about', component: AboutPage },
    { path: '/counter', name: 'counter', component: CounterPage, meta: { requiresAuth: true } },
    { path: '/calculator', name: 'calculator', component: CalculatorPage },
    { path: '/tic-tac-toe', name: 'tic-tac-toe', component: TicTacToePage },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundPage },
  ],
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    const auth = useAuthStore()
    if (!auth.isAuthenticated) {
      return { name: 'home' }
    }
  }
  return true
})

export default router
