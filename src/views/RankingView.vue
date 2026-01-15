<script setup lang="ts">
defineOptions({ name: 'RankingView' })
import AddButton from '@/components/AddButton.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue' // filter
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

const selectedGenre = ref('') // filter
const genres = [ // filter
  'Trance', 'Hardtrance', 'Techno', 'Hardtechno', 'Groove', 'House',
  'Hardhouse', 'Gabber', 'Hardcore', 'Hardstyle', 'Tekk', 'Hardtekk'
]
const filteredKollektivs = computed(() => { // filter
  if (!selectedGenre.value) return kollektivs.value
  return kollektivs.value.filter(k => k.genre === selectedGenre.value)
})

async function loadKollektivs() {
  try {
    const response = await axios.get(`${API_URL}/kollektiv/ranked`)
    kollektivs.value = response.data
  } catch (err) {
    console.error('Fehler beim Laden:', err)
  }
}

const deletePassword = import.meta.env.VITE_DELETE_PASSWORD;

async function deleteKollektiv(id: number) {
  const password = prompt('Bitte Passwort eingeben, um das Kollektiv zu löschen:')
  if (password !== deletePassword) {
    alert('Falsches Passwort')
    return
  }

  try {
    await axios.delete(`${API_URL}/kollektiv/delete/${id}`)
    kollektivs.value = kollektivs.value.filter(k => k.id !== id)
  } catch (err) {
    console.error('Fehler beim Löschen:', err)
  }
}

onMounted(() => {
  loadKollektivs()
})

const selectedRating = ref<{ [id: number]: number }>({}) // speichert aktuelle Stern-Bewertung pro Kollektiv

function userIdFromStorage(): string | null {
  const user = localStorage.getItem("user");
  if (!user) return null;
  const parsed = JSON.parse(user);
  return parsed.id?.toString() || null;
}


async function rateKollektiv(kollektiv: Kollektiv, rating: number) {
  selectedRating.value[kollektiv.id] = rating

  const userId = userIdFromStorage()
  if (!userId) {
    alert("Please login")
    return
  }

  try {
    await axios.post(
      `${API_URL}/bewertung/add`,
      {
        bewertung: rating
      },
      {
        params: {
          userId: userId,
          kollektivId: kollektiv.id
        }
      }
    )

    await loadKollektivs()
  } catch (err) {
    console.error('Fehler beim Bewerten:', err)
  }
}




</script>

<template>
  <header>
    <h2>Top Collectives Ranking</h2>
  </header>

  <!-- Filter -->
  <div class="top-controls">
    <select v-model="selectedGenre" class="genre-dropdown">
      <option value="">All Genres</option>
      <option v-for="g in genres" :key="g" :value="g">{{ g }}</option>
    </select>

    <AddButton @click="navigateToAddCollective" />
  </div>

  <main class="kollektivs-list">
    <router-link
      v-for="kollektiv in filteredKollektivs"
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
          <div class="kollektiv-header">
            <h3 class="kollektiv-title">{{ kollektiv.name }}</h3>
            <span class="kollektiv-durchschnittsbewertung">
              <span class="avg-symbol">Ø</span>
              <span class="avg-value">{{ kollektiv.durchschnittsBewertung.toFixed(1) }}</span>
            </span>

          </div>          <p class="kollektiv-genre">{{ kollektiv.genre }}</p>
          <p class="kollektiv-describtion">{{ kollektiv.beschreibung }}</p>
        </div>
        <button
          class="delete-button"
          type="button"
          @click.stop.prevent="deleteKollektiv(kollektiv.id)"
        >
          Delete
        </button>

        <div class="rating">
          <button
            v-for="star in 5"
            :key="star"
            type="button"
            :class="['star']"
            @click.stop.prevent="rateKollektiv(kollektiv, star)"
          >
            ★
          </button>
        </div>


      </article>
    </template>
    </router-link>
  </main>
</template>

<style>

.kollektiv-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.kollektiv-title {
  margin: 0;
  font-size: 4vh;
  font-weight: 800;
  text-transform: uppercase;
  color: #fff;
}

.kollektiv-durchschnittsbewertung {
  display: flex;
  align-items: baseline;
  gap: 0.1vw;
}

.avg-symbol {
  font-size: 2.5vh;
  color: #aaa;
}

.avg-value {
  font-size: 3vh;
  font-weight: 600;
  color: #fff;
}

.rating{
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}
.rating .star {
  font-size: 1.4rem;
  color: #555;
  line-height: 1;
  user-select: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.rating .star.filled {
  color: rgba(188, 89, 241, 0.77);
}

.rating .star:hover,
.rating .star.filled:hover {
  color: rgba(188, 89, 241, 0.77);
  transform: scale(1.2);
}





/* Filter */
.top-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 91%;
  margin: 2rem auto;
  padding: 0 5%;
}

/* Filter */
.genre-dropdown {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding: 8px 16px;
  padding-right: 36px;
  border: none;
  border-radius: 8px;
  background: rgba(188, 89, 241, 0.36);
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  background-image:
    linear-gradient(45deg, transparent 50%, currentColor 50%),
    linear-gradient(135deg, currentColor 50%, transparent 50%);
  background-position: calc(100% - 18px) 50%, calc(100% - 12px) 50%;
  background-size: 6px 6px, 6px 6px;
  background-repeat: no-repeat;
}

/* Filter */
.genre-dropdown:hover {
  background: rgba(188, 89, 241, 0.65);
}

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

header h2 {
  margin-top: 7rem;
  text-align: center;
  font-size: 6vh;
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
  font-size: 4vh;
  font-weight: 800;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  color: #fff;
}

.kollektiv-genre {
  color: #aaa;
  font-size: 3vh;
  margin-bottom: 0.75rem;
}

.kollektiv-describtion {
  color: #aaa;
  font-size: 1.9vh;
}
</style>
