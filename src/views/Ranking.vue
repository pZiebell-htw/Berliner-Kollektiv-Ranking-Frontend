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

  <main class="kollektivs-list">
    <router-link
      v-for="kollektiv in kollektivs"
      :key="kollektiv.id"
      :to="{ name: 'kollektivDetail', params: { id: kollektiv.id } }"
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

.kollektivs-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 90%;
  margin: 2rem auto;
}

.kollektiv-card {
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

.kollektiv-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  cursor: pointer;
}

.kollektiv-image {
  width: auto;
  height: 23vh;
  object-fit: cover;
  flex-shrink: 0;
}

.kollektiv-content {
  padding: 1rem;
  flex: 1;
}

.kollektiv-title {
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  color: #fff;
}

.kollektiv-genre {
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.kollektiv-describtion {
  color: #aaa;
  font-size: 0.9rem;
}

/* ✅ Tablets & kleine Laptops (< 768px) */
@media (max-width: 768px) {
  .add-button-container {
    padding-right: 2.5%;
    transform: scale(0.80);
    transform-origin: right center;
  }

  header h2 {
    margin-top: 5rem;
    font-size: 1.2rem;
  }

  .kollektivs-list {
    width: 100%;
  }

  .kollektiv-card {
    height: auto;
    flex-direction: column;
    width: 95%;
  }

  .kollektiv-image {
    width: 100%;
    height: auto;
    max-height: 200px;
  }

  .kollektiv-content {
    padding: 0.75rem;
  }

  .kollektiv-title {
    font-size: 1rem;
  }

  .kollektiv-genre {
    font-size: 0.85rem;
  }

  .kollektiv-describtion {
    display: none;
  }
}

/* ✅ Sehr kleine Handys (< 480px) */
@media (max-width: 480px) {
  .add-button-container {
    padding-right: 2.5%;
    transform: scale(0.60);
    transform-origin: right center; /* ← Skaliert von rechts aus */
  }

  header h2 {
    margin-top: 4rem;
    font-size: 1rem;
  }

  .kollektivs-list {
    width: 95%;
    gap: 0.75rem;
  }

  .kollektiv-card {
    width: 95%;
  }

  .kollektiv-image {
    max-height: 150px;
  }

  .kollektiv-content {
    padding: 0.5rem;
  }

  .kollektiv-title {
    font-size: 0.9rem;
    margin-bottom: 0.15rem;
  }

  .kollektiv-genre {
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .kollektiv-describtion {
    display: none;
  }
}

</style>
