<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const search = ref('')

function onSearchKey(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    const q = search.value.trim()
    if (q) {
      router.push({ path: '/search', query: { q } })
    }
  }
}
</script>

<template>
  <main>
    <div class="button-container">
      <router-link to="/" class="button" aria-label="Home">HOME</router-link>
      <router-link to="/ranking" class="button" aria-label="Ranking">RANKING</router-link>
      <input class="input" name="suche" placeholder="SUCHE" v-model="search" @keydown="onSearchKey">
      <router-link to="/profile" class="button right">PROFILE</router-link>
    </div>
  </main>
</template>

<style scoped>
.button-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding: 0 16px;
  box-sizing: border-box;
  background-color: rgb(64, 48, 73);
  z-index: 9999;
  border-radius: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}

.button {
  outline: 0 !important;
  border: 0;
  min-width: 88px;
  height: 36px;
  border-radius: 5px;
  padding: 0 12px;
  background-color: transparent;
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.18s ease-in-out, background-color 0.12s ease;
  cursor: pointer;
}

.button.right {
  margin-left: auto;
}

.button:hover,
.button:focus-visible {
  background-color: rgba(255, 255, 255, 0.06);
}

@media (max-width: 600px) {
  .button {
    width: auto;
    font-size: 13px;
    height: 34px;
  }
}
.input {
  outline: 0 !important;
  border: 0;
  -webkit-appearance: none;
  appearance: none;
  width: auto;
  max-width: 30vh;
  height: 36px;
  border-radius: 5px;
  padding: 0 12px;
  background-color: rgba(139, 94, 164, 0.08);
  color: #fff;
  font-weight: 600;
  font-size: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.18s ease-in-out, background-color 0.12s ease;
  cursor: text;
  box-sizing: border-box;
}

.input::placeholder {
  color: rgba(255, 255, 255, 0.6);
  font-weight: 400;
  font-size: 13px;
}

.input:focus,
.input:hover {
  background-color: rgba(255, 255, 255, 0.06);
}

/* ✅ Tablets & kleine Laptops (< 768px) */
@media (max-width: 768px) {
  .button-container {
    gap: 8px; /* ← Weniger Abstand */
    padding: 0 8px;
  }

  .button {
    min-width: 60px; /* ← Schmaler */
    font-size: 14px;
    padding: 0 8px;
  }

  .input {
    max-width: 100px; /* ← Schmaleres Suchfeld */
    font-size: 14px;
    padding: 0 8px;
  }

  .input::placeholder {
    font-size: 12px;
  }
}

/* ✅ Sehr kleine Handys (< 480px) */
@media (max-width: 480px) {
  .button-container {
    gap: 4px;
    padding: 0 4px;
  }

  .button {
    min-width: 50px;
    font-size: 12px;
    padding: 0 6px;
    height: 32px; /* ← Flacher */
  }

  .input {
    max-width: 70px; /* ← Noch schmaler */
    font-size: 12px;
    height: 32px;
    padding: 0 6px;
  }

  .input::placeholder {
    font-size: 10px;
  }
}

</style>
