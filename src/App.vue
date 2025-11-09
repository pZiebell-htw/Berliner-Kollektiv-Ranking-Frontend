
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
/* Put this in `src/App.vue` style block (remove `scoped`) */
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

/* Ensure the app container spans the full viewport width */
#app-container {
  width: 100vw;
  max-width: 100%;
  padding: 0;
  box-sizing: border-box;
}

/* Make MenuBar and direct children stretch full width */
MenuBar,
#app-container > * {
  width: 100%;
  max-width: 100%;
}

/* Utility class for views that should be full-bleed */
.full-bleed {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  max-width: 100%;
  box-sizing: border-box;
}
</style>








