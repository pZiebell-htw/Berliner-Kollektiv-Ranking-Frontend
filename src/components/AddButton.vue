<script setup lang="ts">

</script>

<template>
    <button class="add-button">
    <span class="plus-icon">
      <span></span>
      <span></span>
    </span>
      <span class="add-text">Add</span>
    </button>
</template>


<style scoped>

.add-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: rgba(188, 89, 241, 0.36);
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background: rgba(188, 89, 241, 0.65);
}

.plus-icon {
  width: 20px;
  height: 20px;
  position: relative;
  display: inline-block;
  left: -4px;
  top: 1px;
}

.plus-icon span {
  position: absolute;
  background-color: rgb(139, 94, 164);
}

.plus-icon span:first-child {
  width: 84%;
  height: 2px;
  top: 42%;
  left: 0;
  transform: translateY(-50%);
}

.plus-icon span:last-child {
  width: 2px;
  height: 84%;
  left: 42%;
  top: 0;
  transform: translateX(-50%);
}

.add-text {
  line-height: 1;
}

</style>
