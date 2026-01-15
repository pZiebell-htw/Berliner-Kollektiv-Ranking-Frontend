<script setup lang="ts">
import { onMounted, ref } from 'vue'
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
    console.log("Antwort Backend:", response.data)
    user.value = response.data
  } catch (err) {
    console.error("Fehler beim Laden:", err)
  }
}

function logout() {
  localStorage.removeItem("user")
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
    console.log("Antwort Backend:", response.data)
    kollektivs.value = response.data
  } catch (err) {
    console.error("Fehler beim Laden:", err)
  }
}

onMounted(() => {
  const storedUser = localStorage.getItem("user")
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser)
    loadUser(parsedUser.id)
    loadKollektivs(parsedUser.id)
  }
})
</script>

<template>
  <header class="profile-header">
    <div class="profile-info-only-text">
      <h2 class="username">{{ user?.name }}</h2>
      <p class="email">{{ user?.email }}</p>
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

    <button class="logout" @click="logout">Logout</button>
  </main>
</template>

<style>
.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0.25rem 5%;
  border-radius: 10px;
  margin: 1rem auto 5rem auto;
  width: 90%;
}

.profile-info-only-text .email {
  color: #aaa;
  font-size: 0.95rem;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 90%;
  margin: 0 auto 3rem auto;
  align-items: center;
}

.posts-list h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #555;
  text-transform: uppercase;
  margin-bottom: 1rem;
  text-align: center;
}

.kollektiv-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.logout {
  width: 14vw;
  height: 5vh;
  margin-top: 2rem;
  background: rgba(188, 89, 241, 0.6);
  border: none;
  border-radius: 6px;
  font-size: 1.9vh;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
}

.logout:hover {
  background-color: rgba(188, 89, 241, 0.85);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
}
</style>
