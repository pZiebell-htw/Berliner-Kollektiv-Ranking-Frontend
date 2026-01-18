<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { API_URL } from '../services/api'
import SoundcloudView from '@/components/SoundcloudView.vue'

interface Kollektiv {
  id: string;
  name: string;
  genre: string;
  bildUrl: string;
  beschreibung: string;
  durchschnittsBewertung: number;
  instagramUrl: string;
  soundcloudUrl: string;
}

const kollektiv = ref<Kollektiv | null>(null)
const route = useRoute()

function saveToHistory(k: Kollektiv) {
  const history = JSON.parse(localStorage.getItem('lastViewed') || '[]')
  const entry = { id: k.id, name: k.name, bildUrl: k.bildUrl }
  const filtered = history.filter((item: any) => item.id !== entry.id)
  filtered.unshift(entry)
  localStorage.setItem('lastViewed', JSON.stringify(filtered.slice(0, 10)))
}

async function loadKollektivDetail() {
  const id = route.params.id as string
  try {
    const response = await axios.get(`${API_URL}/kollektiv/${id}`)
    kollektiv.value = response.data
    if (kollektiv.value) {
      saveToHistory(kollektiv.value)
    }
  } catch (err) {
    console.error("Fehler beim Laden des Kollektivs:", err)
  }
}

onMounted(() => {
  loadKollektivDetail()
})
</script>



<template>
  <main class="kollektiv-detail">
    <div v-if="kollektiv" class="kollektiv-container">

      <div class="top-content">
        <div class="kollektiv-image-container">
          <img :src="kollektiv.bildUrl || '/placeholder.png'" class="kollektiv-image" />

          <a v-if="kollektiv.instagramUrl" :href="kollektiv.instagramUrl" target="_blank" class="instagram-brand">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg" class="insta-icon-small" />
            <span class="insta-text">Instagram</span>
          </a>
        </div>

        <div class="kollektiv-info">
          <div class="title-rating-row">
            <h2 class="kollektiv-name">{{ kollektiv.name }}</h2>
            <span class="kollektiv-rating">Ø {{ kollektiv.durchschnittsBewertung.toFixed(1) }}</span>
          </div>

          <h3 class="kollektiv-genre">{{ kollektiv.genre }}</h3>
          <p class="kollektiv-description">{{ kollektiv.beschreibung }}</p>
        </div>
      </div>

      <div v-if="kollektiv.soundcloudUrl" class="bottom-content">
        <div class="soundcloud-wrapper">
          <SoundcloudView :soundcloud-url="kollektiv.soundcloudUrl" />
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped>
.kollektiv-detail {
  margin-top: 5vh;
  padding: 1% 2%;
  min-height: calc(100vh - 5vh);
  display: flex;
  justify-content: center;
}

.kollektiv-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background: color-mix(in srgb, var(--color-background) 80%, black);
  border-radius: 12px;
  border: 2px solid rgba(188, 89, 241, 0.36);
  padding: 2rem;
  box-sizing: border-box;
  height: fit-content;
}

.top-content {
  display: flex;
  gap: 2.5rem;
  margin-bottom: 2rem;
  align-items: flex-start;
}

.kollektiv-image-container {
  width: 15vw;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.kollektiv-image {
  width: 15vw !important;
  height: 15vw !important;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid rgba(188, 89, 241, 0.2);
  display: block;
}

.kollektiv-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.title-rating-row {
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  margin-bottom: 0.5rem;
}

.kollektiv-name {
  font-size: 5vh;
  color: #8B5EA4;
  text-transform: uppercase;
  margin: 0;
}

.kollektiv-rating {
  font-size: 2.5vh;
  font-weight: 800;
  color: #bc59f1;
}

.kollektiv-genre {
  font-size: 2.5vh;
  color: #8B5EA4;
  margin-bottom: 1.5rem;
  text-transform: capitalize;
}

.kollektiv-description {
  font-size: 2vh;
  color: #aaa;
  line-height: 1.5;
  margin: 0;
}

.bottom-content {
  width: 100%;
  margin-top: 0.1rem;
}

.soundcloud-wrapper {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: transparent !important;
}

.soundcloud-wrapper :deep(iframe) {
  background-color: transparent !important;
  border: none !important;
  display: block;
}

.instagram-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-decoration: none;
  background: rgba(188, 89, 241, 0.1);
  padding: 8px;
  border-radius: 8px;
  border: 1px solid rgba(188, 89, 241, 0.3);
  transition: all 0.3s ease;
}

.instagram-brand:hover {
  background: rgba(188, 89, 241, 0.2);
  transform: translateY(-2px);
  border-color: #bc59f1;
}

.insta-icon-small {
  height: 24px;
  width: 24px;
}

.insta-text {
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
}
</style>
