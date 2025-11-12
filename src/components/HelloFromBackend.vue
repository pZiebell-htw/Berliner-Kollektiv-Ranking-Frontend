<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../services/api'; // Pfad ggf. anpassen, falls dein Ordner anders heißt

// State-Variable für die Nachricht
const message = ref<string>('');

// Wird automatisch ausgeführt, wenn die Komponente geladen wird
onMounted(async () => {
  try {
    // Anfrage an dein Backend
    const response = await api.get('/api/hello');
    message.value = response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen:', error);
    message.value = 'Fehler beim Laden 😢';
  }
});
</script>

<template>
  <div style="text-align:center; margin-top:2rem;">
    <h1>{{ message }}</h1>
  </div>
</template>
