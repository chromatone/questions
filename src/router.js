import { createRouter, createWebHashHistory } from 'vue-router'
import Phrase from './components/phrase.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'phrase',
      component: Phrase
    },
    {
      path: '/:num',
      name: 'phrase',
      component: Phrase,
      props: true
    },
  ]
})

export default router
