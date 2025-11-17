import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '@/views/Login.vue'
import Ranking from '@/views/Ranking.vue'
import AddNewCollective from '@/views/AddNewCollective.vue'
import Ranking2 from '@/views/Ranking2.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/ranking', name: 'ranking', component: Ranking },
    { path: '/ranking2', name: 'ranking2', component: Ranking2 },

    { path: '/add', name: 'add', component: AddNewCollective },


  ],
})

export default router
