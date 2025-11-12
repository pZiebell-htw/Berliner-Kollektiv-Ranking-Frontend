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
      <router-link to="/login" class="button right">PROFIL</router-link>
    </div>
  </main>
</template>

<style scoped>
.button-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  padding: 0 16px;
  box-sizing: border-box;
  background-color: rgba(64, 48, 73, 0.76);
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
  transform: translateY(-3px);
  background-color: rgba(255, 255, 255, 0.06);
}

@media (max-width: 480px) {
  .button {
    min-width: 64px;
    font-size: 13px;
    height: 34px;
  }
}


</style>
