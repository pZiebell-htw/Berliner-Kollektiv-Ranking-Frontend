<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { API_URL } from '@/services/api.ts'
import router from '@/router'

const profileImage = 'https://cdn-icons-png.flaticon.com/512/9706/9706583.png';

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
    <img :src="profileImage" alt="Profile Image" class="profile-image">
    <div class="profile-info">
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

.logout{
  width: 10vw;
  height: 3vh;
  position: absolute;
  bottom: 5vh;
  background: rgba(188, 89, 241, 0.36);
  border: none;
  border-radius: 5px;
  font-size: 1.5vh;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem 5%;
  border-radius: 10px;
  border: none;
  margin: 3rem auto 2rem auto;
  width: 90%;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(188, 89, 241, 0.36);
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.profile-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.profile-info .email {
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
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 1rem;
  text-align: center;
}

.post-card {
  display: flex;
  gap: 1rem;
  background: color-mix(in srgb, var(--color-background) 80%, black);
  border-radius: 8px;
  border: 2px solid rgba(188, 89, 241, 0.36);
  padding: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 90%;
}

.post-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}

.post-content {
  flex: 1;
}

.post-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
}

.post-text {
  color: #ccc;
  font-size: 0.9rem;
}

.post-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  border: 2px solid rgba(188, 89, 241, 0.36);
}
</style>

