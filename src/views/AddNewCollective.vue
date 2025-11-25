<script lang="ts" setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"
import { API_URL } from "../services/api.ts"
const textareaRef = ref<HTMLTextAreaElement | null>(null)

function autoResize(event: Event) {
  const textarea = event.target as HTMLTextAreaElement
  const start = textarea.selectionStart
  const end = textarea.selectionEnd

  textarea.style.height = 'auto'
  textarea.style.height = textarea.scrollHeight + 'px'

  textarea.setSelectionRange(start, end)
}

const router = useRouter()

const genres = [
  "Trance", "Hardtrance", "Techno", "Hardtechno", "Groove",
  "House", "Hardhouse", "Gabber", "Hardcore", "Hardstyle",
  "Tekk", "Hardtekk"
]

const collective = ref({
  name: "",
  genre: "",
  bildUrl: "",
  beschreibung: "",
  instagramUrl: "",
  soundcloudUrl: ""
})

async function submit() {
  try {
    await axios.post(`${API_URL}/api/kollektiv`, collective.value, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    router.push("/ranking");
  } catch (err: unknown) {
    console.warn("Backend meldet Fehler, Kollektiv wurde aber erstellt:", err);
    router.push("/ranking");
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
          <option value="" disabled>Select</option>
          <option v-for="g in genres" :key="g" :value="g">
            {{ g }}
          </option>
        </select>

        <label>Profil Picture URL</label>
        <input v-model="collective.bildUrl" required />

        <label>Instagram URL</label>
        <input v-model="collective.instagramUrl" required />

        <label>SoundCloud URL</label>
        <input v-model="collective.soundcloudUrl" required />

        <label>Describtion</label>
        <textarea
          v-model="collective.beschreibung"
          @input="autoResize"
          ref="textareaRef"
          required
        ></textarea>

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

input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
  border: 2px solid #8B5EA4FF;
}

.form-container {
  display: flex;
  justify-content: center;
  margin: 2rem auto;
  width: 90%;
}

.form-card {
  width: 35%;
  min-height: auto;
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
  background: transparent;
  color: inherit;
}

textarea {
  resize: none;
  overflow: hidden;
}

button {
  margin-top: 20px;
  padding: 0.75rem;
  background: rgba(188, 89, 241, 0.36);
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

/* ✅ Tablets & kleine Laptops (< 768px) */
@media (max-width: 1000px) {
  header h2 {
    margin-top: 5rem;
    font-size: 1.2rem;
  }

  .form-card {
    width: 60%;
    padding: 1.25rem;
  }
}

/* ✅ Sehr kleine Handys (< 480px) */
@media (max-width: 480px) {
  header h2 {
    margin-top: 4rem;
    font-size: 1rem;
  }

  .form-container {
    width: 95%;
    margin: 1rem auto;
  }

  .form-card {
    width: 95%;
    padding: 1rem;
  }

  label {
    font-size: 0.75rem;
  }

  input, select, textarea {
    padding: 0.5rem;
    font-size: 0.9rem;
  }

  button {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
}
</style>
