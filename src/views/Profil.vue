<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import axios from 'axios'
import { API_URL } from '@/services/api.ts'
import router from '@/router'

interface User {
  id: number
  name: string
  email: string
}

const user = ref<User | null>(null)

async function loadUser(userId: number) {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`)
    user.value = response.data
  } catch (err) {
    console.error("Fehler beim Laden:", err)
  }
}

function logout() {
  localStorage.clear()
  router.push("/login")
}

interface Kollektiv {
  id: number
  name: string
  genre: string
  bildUrl: string
  beschreibung: string
  durchschnittsBewertung: number
}

const kollektivs = ref<Kollektiv[]>([])

async function loadKollektivs(userId: number) {
  try {
    const response = await axios.get(`${API_URL}/kollektiv/user/${userId}`)
    kollektivs.value = response.data
  } catch (err) {
    console.error("Fehler beim Laden:", err)
  }
}

const showScrollButton = ref(false)
const handleScroll = () => {
  showScrollButton.value = window.scrollY > 300
}
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  const storedUser = localStorage.getItem("user")
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser)
    loadUser(parsedUser.id)
    loadKollektivs(parsedUser.id)
  }
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header class="profile-header">
    <div class="profile-info-only-text">
      <h2 class="username">{{ user?.name }}</h2>
      <p class="email">{{ user?.email }}</p>
      <button class="logout" @click="logout">Logout</button>
    </div>
  </header>

  <main class="posts-list">
    <h3>Your Posts</h3>
    <router-link
      v-for="kollektiv in kollektivs"
      :key="kollektiv.id"
      :to="{ name: 'kollektivDetail', params: { id: String(kollektiv.id) } }"
      class="kollektiv-card-link"
      custom
    >
      <template #default="{ navigate }">
        <article class="kollektiv-card" @click="navigate">
          <img
            :src="kollektiv.bildUrl || '/placeholder.png'"
            :alt="kollektiv.name"
            class="kollektiv-image"
          />
          <div class="kollektiv-content">
            <h3 class="kollektiv-title">{{ kollektiv.name }}</h3>
            <p class="kollektiv-genre">{{ kollektiv.genre }}</p>
            <p class="kollektiv-describtion">{{ kollektiv.beschreibung }}</p>
          </div>
        </article>
      </template>
    </router-link>
  </main>

  <button
    v-if="showScrollButton"
    @click="scrollToTop"
    class="scroll-to-top"
  >
    ↑
  </button>
</template>

<style scoped>
.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 12vh;
  margin-bottom: 12vh;
}

.username {
  font-size: 6vh;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
  color: #fff;
}

.email {
  color: #aaa;
  font-size: 1.1rem;
  margin: 0.5rem 0 1.5rem 0;
}

.logout {
  width: 14vw;
  min-width: 120px;
  height: 4.5vh;
  background: rgb(64, 48, 73);
  border: none;
  border-radius: 6px;
  font-size: 1.8vh;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout:hover {
  background-color: rgba(188, 89, 241, 0.85);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(188, 89, 241, 0.35);
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 90%;
  margin: 0 auto 5rem auto;
  align-items: center;
}

.posts-list h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #555;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

.kollektiv-card {
  position: relative;
  height: 23vh;
  display: flex;
  align-items: flex-start;
  background: color-mix(in srgb, var(--color-background) 80%, black);
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid rgba(188, 89, 241, 0.36);
  width: 90%;
  transition: transform 0.2s ease;
  cursor: pointer;
}

.kollektiv-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(188, 89, 241, 0.2);
}

.kollektiv-image {
  width: 23vh;
  height: 23vh;
  object-fit: cover;
  flex-shrink: 0;
}

.kollektiv-content {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.kollektiv-title {
  font-size: 4vh;
  font-weight: 800;
  text-transform: uppercase;
  color: #fff;
  margin: 0;
}

.kollektiv-genre {
  color: #aaa;
  font-size: 3vh;
  margin-bottom: 0.5rem;
}

.kollektiv-describtion {
  color: #aaa;
  font-size: 1.9vh;
}

.scroll-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background-color: rgba(188, 89, 241, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  transition: all 0.2s ease;
}

.scroll-to-top:hover {
  background-color: rgba(188, 89, 241, 1);
  transform: scale(1.1);
}
</style>
