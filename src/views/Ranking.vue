<script setup lang="ts">
defineOptions({ name: 'Ranking' })
import AddButton from '@/components/AddButton.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { API_URL } from '../services/api'

// Router
const router = useRouter()

const navigateToAddCollective = () => {
  router.push('/add')
}

// Interface inkl. ID
interface Kollektiv {
  id: string
  name: string
  genre: string
  bildUrl: string
  beschreibung: string
  durchschnittsBewertung: number
}

const kollektivs = ref<Kollektiv[]>([])

// API-Daten laden
async function loadKollektivs() {
  try {
    const response = await axios.get(`${API_URL}/api/kollektivs`)
    console.log("Antwort Backend:", response.data)

    kollektivs.value = response.data
  } catch (err) {
    console.error("Fehler beim Laden:", err)
  }
}

onMounted(() => {
  loadKollektivs()
})
</script>

<template>
  <header>
    <h2>Top Ranking Collectives</h2>
  </header>

  <div class="add-button-container">
    <AddButton @click="navigateToAddCollective" />
  </div>

  <main class="events-list">
    <!-- Jeder Kollektiv-Eintrag ist ein klickbarer Link zur Detailseite -->
    <router-link
      v-for="kollektiv in kollektivs"
      :key="kollektiv.id"
      :to="{ name: 'kollektivDetail', params: { id: kollektiv.id } }"
      class="event-card-link"
      custom
    >
      <template #default="{ navigate }">
        <article class="event-card" @click="navigate">
          <img
            :src="kollektiv.bildUrl || '/placeholder.png'"
            :alt="kollektiv.name"
            class="event-image"
          />
          <div class="event-content">
            <h3 class="event-title">{{ kollektiv.name }}</h3>
            <p class="event-subtitle">{{ kollektiv.genre }}</p>
            <p class="event-subtitle">{{ kollektiv.beschreibung }}</p>
          </div>
        </article>
      </template>
    </router-link>

  </main>
</template>

<style>
.add-button-container {
  display: flex;
  justify-content: flex-end;
  padding-right: 5%;
}

header h2 {
  margin-top: 7rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 90%;
  margin: 2rem auto;
}

.event-card {
  height: 23vh;
  display: flex;
  align-items: flex-start;
  background: color-mix(in srgb, var(--color-background) 80%, black);
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid rgba(188, 89, 241, 0.36);
  width: 90%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.event-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}

.event-image {
  width: 200px;
  height: auto;
  object-fit: cover;
}

.event-content {
  padding: 1rem;
  flex: 1;
}

.event-title {
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  color: #fff;
}

.event-subtitle {
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}
</style>
