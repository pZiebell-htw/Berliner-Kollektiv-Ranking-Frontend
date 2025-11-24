<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { API_URL } from '../services/api'

interface Kollektiv {
  id: string
  name: string
  genre: string
  bildUrl: string
  beschreibung: string
  durchschnittsBewertung: number
  instagramUrl: string | null
  soundcloudUrl: string | null
}

const kollektiv = ref<Kollektiv | null>(null)
const route = useRoute()

// API-Daten für das Kollektiv laden
async function loadKollektivDetail() {
  const id = route.params.id as string
  try {
    const response = await axios.get(`${API_URL}/api/kollektivs/${id}`)
    kollektiv.value = response.data
  } catch (err) {
    console.error("Fehler beim Laden des Kollektivs:", err)
  }
}

onMounted(() => {
  loadKollektivDetail()
})
</script>

<template>
  <header>
    <h2>{{ kollektiv?.name }}</h2>
  </header>

  <main class="kollektiv-detail">
    <div v-if="kollektiv" class="kollektiv-container">
      <div class="kollektiv-image-container">
        <img :src="kollektiv.bildUrl || '/placeholder.png'" alt="Kollektiv Image" class="kollektiv-image" />
      </div>

      <div class="kollektiv-info">
        <h3 class="kollektiv-genre">{{ kollektiv.genre }}</h3>
        <p class="kollektiv-description">{{ kollektiv.beschreibung }}</p>
        <p class="kollektiv-rating">
          <strong>Durchschnittsbewertung:</strong> {{ kollektiv.durchschnittsBewertung }}
        </p>

        <!-- Buttons für Instagram und SoundCloud -->
        <div v-if="kollektiv.instagramUrl" class="social-buttons">
          <a :href="kollektiv.instagramUrl" target="_blank" class="social-button instagram">
            Instagram
          </a>
        </div>

        <div v-if="kollektiv.soundcloudUrl" class="social-buttons">
          <a :href="kollektiv.soundcloudUrl" target="_blank" class="social-button soundcloud">
            SoundCloud
          </a>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.kollektiv-detail {
  padding: 2rem;
}

.kollektiv-container {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: flex-start;
  width: 100%;
  background: color-mix(in srgb, var(--color-background) 80%, black);
  border-radius: 12px;
  border: 2px solid rgba(188, 89, 241, 0.36);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  padding: 1.5rem;
}

.kollektiv-image-container {
  flex: 0 0 300px;
  height: auto;
}

.kollektiv-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}

.kollektiv-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.kollektiv-genre {
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #8B5EA4;
}

.kollektiv-description {
  font-size: 1rem;
  color: #888;
}

.kollektiv-rating {
  font-weight: 600;
  color: #444;
}

.social-buttons {
  display: flex;
  gap: 1rem;
}

.social-button {
  padding: 0.8rem 1.2rem;
  border-radius: 6px;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
  color: white;
  text-decoration: none;
  width: max-content;
  text-align: center;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}

/* Instagram Button */
.social-button.instagram {
  background: #E1306C;
}

.social-button.instagram:hover {
  background: #C13584;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transform: scale(1.05);
}

/* SoundCloud Button */
.social-button.soundcloud {
  background: #FF5500;
}

.social-button.soundcloud:hover {
  background: #FF6A33;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transform: scale(1.05);
}
</style>
