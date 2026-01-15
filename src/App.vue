<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import MenuBar from '@/views/MenuBar.vue'

const route = useRoute()

const showMenuBar = computed(() => route.name !== 'login')

</script>

<template>

  <MenuBar v-if="showMenuBar" />

  <div id="app-container">
    <RouterView />
  </div>
</template>

<style scoped>
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

#app-container {
  width: 100vw;
  max-width: 100%;
  padding: 0;
  box-sizing: border-box;
}
</style>


