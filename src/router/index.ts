import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login.vue'
import Ranking from '@/views/Ranking.vue'
import AddNewCollective from '@/views/AddNewCollective.vue'
import Profil from '@/views/Profil.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/ranking', name: 'ranking', component: Ranking },
    { path: '/add', name: 'add', component: AddNewCollective },
    { path: '/profil', name: 'profil', component: Profil },



  ],
})

export default router
