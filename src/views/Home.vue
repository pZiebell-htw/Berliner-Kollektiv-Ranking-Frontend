<script setup lang="ts">
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
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
}
</style>

