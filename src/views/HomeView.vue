<script setup lang="ts">
import Button from '@/components/Button.vue'

function handler(event?: MouseEvent) {
  console.log('Start-Button geklickt', event)
}
</script>

<template>
  <Topbar />
  <main>
    <div class="button-row">
      <Button to="ranking">Ranking</Button>
      <Button to="login">Hinzu</Button>
      <Button to="login">LOGIN</Button>
      <Button to="login">Login</Button>
    </div>
  </main>
</template>

<style scoped>
.button-row {
  display: flex;
  gap: 0.75rem;        /* sinnvoller Abstand */
  align-items: center;
  flex-wrap: wrap;
}
</style>

