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
  instagramUrl: string | null
  soundcloudUrl: string | null
}

const kollektiv = ref<Kollektiv | null>(null)
const route = useRoute()

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

  <main class="kollektiv-detail">
    <div v-if="kollektiv" class="kollektiv-container">
      <div class="kollektiv-image-container">
        <img :src="kollektiv.bildUrl || '/placeholder.png'" alt="Kollektiv Image" class="kollektiv-image" />
      </div>

      <div class="kollektiv-info">
        <h2 class="kollektiv-name">{{ kollektiv?.name }}</h2>
        <h3 class="kollektiv-genre">{{ kollektiv.genre }}</h3>
        <p class="kollektiv-description">{{ kollektiv.beschreibung }}</p>

        <div class="rating-social-row">
          <p class="kollektiv-rating"> Durchschnittsbewertung: {{ kollektiv.durchschnittsBewertung }} </p>

            <a :href="kollektiv.instagramUrl" target="_blank" class=" instagram">
            <img src="https://img.freepik.com/free-vector/instagram-logo_1199-122.jpg?semt=ais_hybrid&w=740&q=80"
                 alt="Instagram Logo"
                 class="instagram-logo" />
            </a>

        </div>

        <SoundcloudView v-if="kollektiv.soundcloudUrl" :soundcloud-url="kollektiv.soundcloudUrl" />
      </div>
    </div>
  </main>
</template>

<style scoped>


.rating-social-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.kollektiv-rating {
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #8B5EA4;
  margin: 0;
}


.kollektiv-detail {
  box-sizing: border-box;

  margin-top: 5vh;
  padding: 1%;

  height: calc(100vh - 5vh);
  overflow: hidden;
}


.kollektiv-container {
  height: 100%;
  width: 100%;

  display: flex;
  gap: 2rem;

  background: color-mix(in srgb, var(--color-background) 80%, black);
  border-radius: 12px;
  border: 2px solid rgba(188, 89, 241, 0.36);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);

  padding: 1.5rem;
}


.kollektiv-image-container {
  width: 18vw;
}

.kollektiv-image {
  width: 100%;
  height: auto;
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

.kollektiv-name {
  font-size: rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #8B5EA4;
}

.kollektiv-description {
  font-size: 1rem;
  color: #888;
}

.kollektiv-rating {
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #8B5EA4;
}

.instagram{
  height: 60px;
  length: 60px;
  display: flex;
  align-items: center;
}

.instagram-logo{
  border-radius: 5px;
  height: 100%;
  length: 100%;
}



</style>
