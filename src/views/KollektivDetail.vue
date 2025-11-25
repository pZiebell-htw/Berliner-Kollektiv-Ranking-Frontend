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
          <div v-if="kollektiv.instagramUrl" class="social-buttons">
            <a :href="kollektiv.instagramUrl" target="_blank" class="social-button instagram"> Instagram </a>
          </div>
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
  margin-top: 4rem;
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
  width: 18vw;
  height: auto;
}

.kollektiv-image {
  width: 100%;
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
  font-size: 2rem;
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
  text-decoration: none;
  width: max-content;
  text-align: center;
}

/* Instagram Button */
.social-button.instagram {
  background: #E1306C;
  width: 180px;
}

.social-button.instagram:hover {
  background: #C13584;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transform: scale(1.05);
}

/* ✅ Tablets & Handys (< 768px) */
@media (max-width: 768px) {
  .kollektiv-container {
    flex-direction: column;
    width: 90%;
    gap: 1rem;
  }

  .kollektiv-image-container {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
  }

  .kollektiv-name {
    font-size: 1.5rem; /* ← kleiner als 2rem */
  }

  .kollektiv-genre {
    font-size: 1rem; /* ← kleiner als 1.2rem */
  }

  .kollektiv-description {
    font-size: 0.9rem; /* ← kleiner als 1rem */
  }

  .kollektiv-rating {
    font-size: 1rem; /* ← kleiner als 1.2rem */
  }

  .rating-social-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .social-button.instagram {
    width: 100%;
  }
}

/* ✅ Sehr kleine Handys (< 480px) */
@media (max-width: 480px) {
  .kollektiv-container {
    width: 95%;
    padding: 1rem;
  }

  .kollektiv-name {
    font-size: 1.2rem; /* ← noch kleiner */
  }

  .kollektiv-genre {
    font-size: 0.9rem;
  }

  .kollektiv-description {
    font-size: 0.85rem;
  }

  .kollektiv-rating {
    font-size: 0.9rem;
  }

  .kollektiv-image-container {
    max-width: 300px;
  }
}

</style>
