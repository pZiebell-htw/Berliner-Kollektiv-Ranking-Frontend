<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const history = ref<any[]>([])
const router = useRouter()

onMounted(() => {
  history.value = JSON.parse(localStorage.getItem('lastViewed') || '[]')
})

function goToDetail(id: string) {
  router.push({ name: 'kollektivDetail', params: { id } })
}
</script>

<template>
  <main class="history-page">
    <h2>Recently Viewed</h2>
    <div v-if="history.length === 0" class="empty">Your history is empty.</div>
    <div class="history-grid">
      <article v-for="item in history" :key="item.id" class="history-card" @click="goToDetail(item.id)">
        <img :src="item.bildUrl || '/placeholder.png'" alt="" />
        <div class="overlay">
          <span class="name">{{ item.name }}</span>
        </div>
      </article>
    </div>
  </main>
</template>

<style scoped>
.history-page { padding: 10vh 2rem 2rem; min-height: 100vh; text-align: center; }
h2 { font-size: 5vh; color: #8B5EA4; text-transform: uppercase; margin-bottom: 3rem; }
.history-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 25px; max-width: 1200px; margin: 0 auto;
}
.history-card {
  position: relative; aspect-ratio: 1; cursor: pointer; border-radius: 12px;
  overflow: hidden; border: 2px solid rgba(188, 89, 241, 0.36);
  transition: transform 0.3s ease;
}
.history-card:hover { transform: translateY(-5px); border-color: #8B5EA4; }
.history-card img { width: 100%; height: 100%; object-fit: cover; }
.overlay {
  position: absolute; bottom: 0; width: 100%; padding: 15px;
  background: linear-gradient(transparent, rgba(0,0,0,0.9));
  color: white; font-weight: 600; font-size: 1.2rem;
}
.empty { color: #555; font-size: 1.5rem; margin-top: 5rem; }
</style>
