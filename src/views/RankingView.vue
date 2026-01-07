<script setup lang="ts">

defineOptions({ name: 'RankingView' })
import AddButton from '@/components/AddButton.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { API_URL } from '../services/api'



const router = useRouter()

const navigateToAddCollective = () => {
  router.push('/add')
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

async function loadKollektivs() {
  try {
    const response = await axios.get(`${API_URL}/api/kollektivs`)
    console.log("Antwort Backend:", response.data)

    kollektivs.value = response.data
  } catch (err) {
    console.error("Fehler beim Laden:", err)
  }
}

async function deleteKollektiv(id: number) {
  const password = prompt("Bitte Passwort eingeben, um das Kollektiv zu löschen:")

  if (password !== "12345") {
    alert("Falsches Passwort")
    return
  }

  try {
    await axios.delete(`${API_URL}/api/kollektivs/${id}`)
    kollektivs.value = kollektivs.value.filter(k => k.id !== id)
  } catch (err) {
    console.error("Fehler beim Löschen:", err)
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
          <button
            class="delete-button"
            type="button"
            @click.stop.prevent="deleteKollektiv(kollektiv.id)"
          >
            Delete
          </button>
        </article>
      </template>
    </router-link>
  </main>
</template>

<style>


.delete-button {
  position: absolute;
  right: 1rem;
  top: 1rem;

  background: rgba(64, 48, 73, 0.92);
  color: #fff;
  border: none;
  padding: 0.35rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  z-index: 2;
}


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
  position: relative;
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
  width: 23vh;
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

</style>
