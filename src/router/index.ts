import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import AddNewCollective from '@/views/AddNewCollective.vue'
import Profil from '@/views/Profil.vue'
import RankingView from '@/views/RankingView.vue'
import KollektivDetail from '@/views/KollektivDetail.vue'
import LastViewed from '@/views/LastViewed.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Login },
    { path: '/login', name: 'login', component: Login },
    { path: '/profile', name: 'profile', component: Profil },
    { path: '/add', name: 'add', component: AddNewCollective },
    { path: '/ranking', name: 'ranking', component: RankingView },
    { path: '/kollektiv/:id', name: 'kollektivDetail', component: KollektivDetail },
    { path: '/last-viewed', name: 'lastViewed', component: LastViewed },
  ],
})


router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/']

  const authRequired = !publicPages.includes(to.path)

  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})

export default router
