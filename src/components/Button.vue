<script setup lang="ts">
import { useSlots } from 'vue'
const props = defineProps<{ label?: string; to?: string }>()
const emit = defineEmits<{
  (e: 'click', ev?: MouseEvent): void
}>()
const slots = useSlots()
</script>

<template>
  <router-link
    v-if="props.to"
    :to="props.to"
    class="Btn-Container"
    @click="$emit('click', $event)"
  >
    <span class="text"><slot>{{ props.label ?? 'Explore' }}</slot></span>
    <span class="icon-Container">
      <!-- SVG behalten -->
      <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="1.61321" cy="1.61321" r="1.5" fill="black"/>
        <circle cx="5.73583" cy="1.61321" r="1.5" fill="black"/>
        <circle cx="5.73583" cy="5.5566" r="1.5" fill="black"/>
        <circle cx="9.85851" cy="5.5566" r="1.5" fill="black"/>
        <circle cx="9.85851" cy="9.5" r="1.5" fill="black"/>
        <circle cx="13.9811" cy="9.5" r="1.5" fill="black"/>
        <circle cx="5.73583" cy="13.4434" r="1.5" fill="black"/>
        <circle cx="9.85851" cy="13.4434" r="1.5" fill="black"/>
        <circle cx="1.61321" cy="17.3868" r="1.5" fill="black"/>
        <circle cx="5.73583" cy="17.3868" r="1.5" fill="black"/>
      </svg>
    </span>
  </router-link>

  <button
    v-else
    class="Btn-Container"
    @click="$emit('click', $event)"
  >
    <span class="text"><slot>{{ props.label ?? 'Explore' }}</slot></span>
    <span class="icon-Container">
      <!-- identisches SVG -->
      <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="1.61321" cy="1.61321" r="1.5" fill="black"/>
        <circle cx="5.73583" cy="1.61321" r="1.5" fill="black"/>
        <circle cx="5.73583" cy="5.5566" r="1.5" fill="black"/>
        <circle cx="9.85851" cy="5.5566" r="1.5" fill="black"/>
        <circle cx="9.85851" cy="9.5" r="1.5" fill="black"/>
        <circle cx="13.9811" cy="9.5" r="1.5" fill="black"/>
        <circle cx="5.73583" cy="13.4434" r="1.5" fill="black"/>
        <circle cx="9.85851" cy="13.4434" r="1.5" fill="black"/>
        <circle cx="1.61321" cy="17.3868" r="1.5" fill="black"/>
        <circle cx="5.73583" cy="17.3868" r="1.5" fill="black"/>
      </svg>
    </span>
  </button>
</template>

<style scoped>
/* From Uiverse.io by vinodjangid07 START OF BUTTON*/
.Btn-Container {
  display: flex;
  width: 170px;
  height: fit-content;
  background: color-mix(in srgb, var(--color-background) 80%, black);
  border-radius: 40px;
  border: 1px solid rgba(188, 89, 241, 0.36);
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-family: var(--font-display), system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
  font-weight: 600;
  font-size: 1rem;
}
.icon-Container {
  width: 45px;
  height: 45px;
  background-color: rgba(188, 89, 241, 0.36);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 3px solid #1d2129;
}
.text {
  width: calc(170px - 45px);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.1em;
  letter-spacing: 1.2px;
}
.icon-Container svg {
  transition-duration: 1.5s;
}
.Btn-Container:hover .icon-Container svg {
  transition-duration: 1.5s;
  animation: arrow 1s linear infinite;
}
@keyframes arrow {
  0% {
    opacity: 0;
    margin-left: 0px;
  }
  100% {
    opacity: 1;
    margin-left: 10px;
  }
}
/* From Uiverse.io by vinodjangid07 END OF BUTTON*/
</style>
