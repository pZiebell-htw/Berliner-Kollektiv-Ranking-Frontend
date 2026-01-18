<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { API_URL } from '../services/api'

const router = useRouter()
const route = useRoute()
const search = ref('')

const isLoggedIn = ref(!!localStorage.getItem('user'))

watch(() => route.path, () => {
  isLoggedIn.value = !!localStorage.getItem('user')
})

interface Kollektiv {
  id: string
  name: string
}

const allKollektivs = ref<Kollektiv[]>([])

async function loadKollektivs() {
  try {
    const response = await axios.get(`${API_URL}/kollektiv/all`)
    allKollektivs.value = response.data
  } catch (err) {
    console.error("Fehler beim Laden:", err)
  }
}

onMounted(() => {
  loadKollektivs()
})

function onSearchKey(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    const q = search.value.trim()
    const found = allKollektivs.value.find(k => k.name.toLowerCase() === q.toLowerCase())
    if (found) {
      router.push({ name: 'kollektivDetail', params: { id: found.id } }).catch(() => {})
      search.value = ''
    }
  }
}

const filteredSuggestions = computed(() =>
  search.value
    ? allKollektivs.value.filter(k =>
      k.name.toLowerCase().includes(search.value.toLowerCase())
    )
    : []
)

function goToDetail(id: string) {
  if (route.name === 'kollektivDetail') {
    router.replace({ path: '/' }).then(() => {
      router.push({ name: 'kollektivDetail', params: { id } }).catch(() => {})
    })
  } else {
    router.push({ name: 'kollektivDetail', params: { id } }).catch(() => {})
  }
  search.value = ''
}

function geheZuZufall() {
  if (allKollektivs.value.length === 0) return
  let zufall: Kollektiv
  do {
    const index = Math.floor(Math.random() * allKollektivs.value.length)
    zufall = allKollektivs.value[index] as Kollektiv
  } while (
    zufall &&
    route.params.id === String(zufall.id) &&
    allKollektivs.value.length > 1
    )

  if (zufall) {
    router.replace({ path: '/' }).then(() => {
      router.push({ name: 'kollektivDetail', params: { id: String(zufall.id) } }).catch(() => {})
    })
  }
}
</script>

<template>
  <div v-if="isLoggedIn && route.path !== '/login' && route.path !== '/'" class="button-container">
    <router-link to="/ranking" class="button">RANKING</router-link>


    <div class="search-wrapper">
      <input
        class="input"
        placeholder="SEARCH"
        v-model="search"
        @keydown="onSearchKey"
      />
      <ul v-if="filteredSuggestions.length" class="suggestions">
        <li v-for="k in filteredSuggestions" :key="k.id" @click="goToDetail(k.id)">
          {{ k.name }}
        </li>
      </ul>
    </div>

    <router-link to="/last-viewed" class="button history-btn">LAST VIEWED</router-link>
    <router-link to="/profile" class="button">PROFILE</router-link>
  </div>
</template>

<style scoped>

.button-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5vh;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  box-sizing: border-box;
  background-color: rgb(64, 48, 73);
  z-index: 9999;
}

.button {
  outline: none;
  border: 0;
  min-width: 88px;
  height: 4vh;
  border-radius: 5px;
  padding: 0 12px;
  background-color: transparent;
  color: #fff;
  font-weight: 600;
  font-size: 2vh;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.18s, background-color 0.12s;
  cursor: pointer;
  text-decoration: none;
}

.history-btn {
  font-size: 1.5vh;
  margin-left: auto;
}

.button:hover {
  background-color: rgba(255, 255, 255, 0.06);
}

.input {
  outline: none;
  border: 0;
  max-width: 40vh;
  height: 36px;
  padding: 0 12px;
  background-color: rgba(139, 94, 164, 0.08);
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  border-radius: 5px;
}

.search-wrapper { position: relative; }

.suggestions {
  position: absolute;
  top: 40px;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: rgba(64, 48, 73, 0.95);
  border-radius: 5px;
  list-style: none;
  z-index: 10000;
  margin: 0;
  padding: 0;
}

.suggestions li { padding: 8px 12px; color: #fff; cursor: pointer; }

.suggestions li:hover { background-color: rgba(255, 255, 255, 0.1); }


</style>
