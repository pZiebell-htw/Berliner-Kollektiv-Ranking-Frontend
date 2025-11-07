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
