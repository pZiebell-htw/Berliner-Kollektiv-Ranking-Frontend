import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login.vue'
import RankingTest from '@/views/RankingTest.vue'
import AddNewCollective from '@/views/AddNewCollective.vue'
import Profil from '@/views/Profil.vue'
import Ranking from '@/views/Ranking.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/rankingTest', name: 'ranking', component: RankingTest },
    { path: '/profile', name: 'profile', component: Profil },
    { path: '/add', name: 'add', component: AddNewCollective },
    { path: '/ranking', name: 'ranking', component: Ranking },

  ],
})

export default router
