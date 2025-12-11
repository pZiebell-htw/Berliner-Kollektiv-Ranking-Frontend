import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login.vue'
import AddNewCollective from '@/views/AddNewCollective.vue'
import Profil from '@/views/Profil.vue'
import RankingView from '@/views/RankingView.vue'
import KollektivDetail from '@/views/KollektivDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/profile', name: 'profile', component: Profil },
    { path: '/add', name: 'add', component: AddNewCollective },
    { path: '/ranking', name: 'ranking', component: RankingView },
    { path: '/kollektiv/:id', name: 'kollektivDetail', component: KollektivDetail }, // Detailseite
  ],
})

export default router
