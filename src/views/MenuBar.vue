<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import { API_URL } from '../services/api'

const router = useRouter()
const route = useRoute()
const search = ref('')

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
loadKollektivs()

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

// Zufallsfunktion
function geheZuZufall() {
  if (!allKollektivs.value.length) return

  let zufall: Kollektiv
  do {
    const index = Math.floor(Math.random() * allKollektivs.value.length)
    zufall = allKollektivs.value[index]
  } while (route.params.id === zufall.id && allKollektivs.value.length > 1)

  router.replace({ path: '/' }).then(() => {
    router.push({ name: 'kollektivDetail', params: { id: zufall.id } }).catch(() => {})
  })
}

</script>

<template>
  <div class="button-container">
    <router-link to="/ranking" class="button">RANKING</router-link>

    <!-- Random Collective Text mittig -->
    <div class="random-button" @click="geheZuZufall">
      <span>Random</span>
      <span>Collective</span>
    </div>

    <div class="search-wrapper">
      <input
        class="input"
        name="suche"
        placeholder="SUCHE"
        v-model="search"
        @keydown="onSearchKey"
      />
      <ul v-if="filteredSuggestions.length" class="suggestions">
        <li v-for="k in filteredSuggestions" :key="k.id" @click="goToDetail(k.id)">
          {{ k.name }}
        </li>
      </ul>
    </div>

    <router-link to="/profile" class="button right">PROFILE</router-link>
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
  justify-content: flex-start;
  gap: 12px;
  padding: 0 16px;
  box-sizing: border-box;
  background-color: rgb(64, 48, 73);
  z-index: 9999;
}

.button {
  outline: none !important;
  border: 0;
  min-width: 88px;
  height: 36px;
  border-radius: 5px;
  padding: 0 12px;
  background-color: transparent;
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.18s ease-in-out, background-color 0.12s ease;
  cursor: pointer;
}

.button.right {
  margin-left: auto;
}

.button:hover,
.button:focus-visible {
  background-color: rgba(255, 255, 255, 0.06);
}

.input {
  outline: none;
  border: 0;
  width: auto;
  max-width: 30vh;
  height: 36px;
  padding: 0 12px;
  background-color: rgba(139, 94, 164, 0.08);
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  border-radius: 5px;
}

.input::placeholder {
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
  font-size: 13px;
}

.input:focus,
.input:hover {
  background-color: rgba(255, 255, 255, 0.06);
}

.search-wrapper {
  position: relative;
}

.suggestions {
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: rgba(64, 48, 73, 0.95);
  border-radius: 5px;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 10000;
}

.suggestions li {
  padding: 8px 12px;
  color: #fff;
  cursor: pointer;
}

.suggestions li:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.random-button {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  line-height: 1.1;
  text-align: center;
}

.random-button:hover {
  color: #8B5EA4;
}
</style>
