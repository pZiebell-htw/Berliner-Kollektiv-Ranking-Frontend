<script setup lang="ts">
defineOptions({ name: 'HomeView' });
import Button from '@/components/Button.vue'
</script>

<template>
  <main>
    <div class="button-row">
      <Button to="ranking">Ranking</Button>
      <Button to="login">Login</Button>
    </div>
  </main>
</template>

<style scoped>

.button-row {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

</style>
