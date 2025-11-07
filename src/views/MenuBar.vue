<script setup lang="ts">

</script>

<template>
  <main>
    <div class="button-container">
      <button class="button" aria-label="Home">HOME</button>
      <button class="button" aria-label="Ranking">RANKING</button>
      <input class="input" name="suche" placeholder="SUCHE" >
      <button class ="button right" to="login">PROFIL</button>
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
.button:focus {
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
