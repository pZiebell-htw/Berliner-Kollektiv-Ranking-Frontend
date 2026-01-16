<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { API_URL } from '../services/api'
import SoundcloudView from '@/components/SoundcloudView.vue'

interface Kollektiv {
  id: string
  name: string
  genre: string
  bildUrl: string
  beschreibung: string
  durchschnittsBewertung: number
  instagramUrl: string
  soundcloudUrl: string
}

const kollektiv = ref<Kollektiv | null>(null)
const route = useRoute()

function saveToHistory(k: Kollektiv) {
  const history = JSON.parse(localStorage.getItem('lastViewed') || '[]')
  const entry = { id: k.id, name: k.name, bildUrl: k.bildUrl }
  const filtered = history.filter((item: any) => item.id !== entry.id)
  filtered.unshift(entry)
  localStorage.setItem('lastViewed', JSON.stringify(filtered.slice(0, 8)))
}

async function loadKollektivDetail() {
  const id = route.params.id as string
  try {
    const response = await axios.get(`${API_URL}/kollektiv/${id}`)
    kollektiv.value = response.data
    if (kollektiv.value) saveToHistory(kollektiv.value)
  } catch (err) {
    console.error("Fehler beim Laden:", err)
  }
}

onMounted(loadKollektivDetail)
</script>

<template>
  <main class="kollektiv-detail">
    <div v-if="kollektiv" class="kollektiv-container">
      <div class="kollektiv-image-container">
        <img :src="kollektiv.bildUrl || '/placeholder.png'" class="kollektiv-image" />
      </div>
      <div class="kollektiv-info">
        <h2 class="kollektiv-name">{{ kollektiv.name }}</h2>
        <h3 class="kollektiv-genre">{{ kollektiv.genre }}</h3>
        <p class="kollektiv-description">{{ kollektiv.beschreibung }}</p>
        <div class="rating-social-row">
          <p class="kollektiv-rating">Ø {{ kollektiv.durchschnittsBewertung.toFixed(1) }}</p>
          <a v-if="kollektiv.instagramUrl" :href="kollektiv.instagramUrl" target="_blank" class="instagram">
            <img src="https://img.freepik.com/free-vector/instagram-logo_1199-122.jpg?w=740" class="instagram-logo" />
          </a>
        </div>
        <SoundcloudView v-if="kollektiv.soundcloudUrl" :soundcloud-url="kollektiv.soundcloudUrl" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.kollektiv-detail { margin-top: 5vh; padding: 1%; height: calc(100vh - 5vh); }
.kollektiv-container {
  display: flex; gap: 2rem; padding: 1.5rem; height: 100%;
  background: color-mix(in srgb, var(--color-background) 80%, black);
  border-radius: 12px; border: 2px solid rgba(188, 89, 241, 0.36);
}
.kollektiv-image-container { width: 18vw; }
.kollektiv-image { width: 100%; border-radius: 8px; }
.kollektiv-info { flex: 1; display: flex; flex-direction: column; gap: 2vh; }
.kollektiv-name { font-size: 6vh; color: #8B5EA4; text-transform: uppercase; }
.kollektiv-genre { font-size: 3vh; color: #8B5EA4; }
.kollektiv-description { font-size: 2vh; color: #888; }
.rating-social-row { display: flex; align-items: center; justify-content: space-between; }
.kollektiv-rating { font-size: 1.5rem; font-weight: 700; color: #8B5EA4; }
.instagram-logo { height: 50px; border-radius: 8px; }
</style>
