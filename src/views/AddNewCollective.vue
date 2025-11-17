<script lang="ts" setup>

import { ref } from "vue"
import axios from "axios"
import { API_URL } from "../services/api.ts"

const genres = [
  "Trance", "Hardtrance", "Techno", "Hardtechno", "Groove",
  "House", "Hardhouse", "Gabber", "Hardcore", "Hardstyle",
  "Tekk", "Hardtekk"
]

const collective = ref({
  name: "",
  genre: "",
  bildUrl: "",
  beschreibung: ""
  }
)

async function submit() {
  try {
    await axios.post(`${API_URL}/api/kollektiv`, collective.value)
    alert("Collective added")
  } catch (err) {
    console.error(err)
    alert("Error while saving collective")
  }
}

</script>


<template>

  <header>
    <h2>ADD COLLECTIVE</h2>
  </header>

  <main class="form-container">

    <div class="form-card">
      <form @submit.prevent="submit">

        <label>Name</label>
        <input v-model="collective.name" required />

        <label>Genre</label>
        <select v-model="collective.genre" required>
          <option v-for="g in genres" :key="g" :value="g">
            {{ g }}
          </option>
        </select>

        <label>Bild URL</label>
        <input v-model="collective.bildUrl" />

        <label>Describtion</label>
        <textarea v-model="collective.beschreibung"></textarea>

        <button type="submit">Add</button>
      </form>
    </div>
  </main>

</template>


<style scoped>

header h2 {
  margin-top: 7rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
}

/* CSS */
input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none; /* Standard entfernen */
  border: 2px solid #8B5EA4FF;
}


/* Zentrierter Bereich wie events-list */
.form-container {
  display: flex;
  justify-content: center;
  margin: 2rem auto;
  width: 90%;
}

.form-card {
  width: 35%;
  min-height: 70vh;
  padding: 1.5rem;
  background: color-mix(in srgb, var(--color-background) 80%, black);
  border-radius: 8px;
  border: 2px solid rgba(188, 89, 241, 0.36);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.form-card:hover {
  box-shadow: 0 4px 16px rgba(188, 89, 241, 0.36);
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

label {
  margin-top: 12px;
  color: #ccc;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
}

input, select, textarea {
  width: 100%;
  padding: 0.6rem;
  margin-top: 0.5rem;
  border-radius: 6px;
  border: 1px solid rgba(188, 89, 241, 0.3);
  background: color-mix(in srgb, var(--color-background) 80%, black);
  color: #fff;
}

textarea {
  height: 220px;
  resize: none;

}

button {
  margin-top: 20px;
  padding: 0.75rem;
  background: rgba(188, 89, 241, 0.36);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s ease;
}

button:hover {
  background: rgba(188, 89, 241, 0.65);
}

</style>
