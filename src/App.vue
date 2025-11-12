
<script setup lang="ts">
import { RouterView } from 'vue-router'
import MenuBar from '@/views/MenuBar.vue'
</script>


<template>
  <MenuBar> </MenuBar>
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

MenuBar,
#app-container > * {
  width: 100%;
  max-width: 100%;
}

</style>








