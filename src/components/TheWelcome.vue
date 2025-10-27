<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')

  const kollektive = [
  { id: 1, name: "HakkeBerlin", genre: "Gabber" },
  { id: 2, name: "Pfandidos", genre: "Trance" },
  { id: 3, name: "Formula90", genre: "Trance" },
  { id: 4, name: "PassivAggresiv", genre: "Gabber" },
  { id: 5, name: "Goatball", genre: "Trance" }
  ]


</script>

<template>
  <table>
    <thead>
    <tr>
      <th>Kollektiv</th>
      <th>Genre</th>
    </tr>
    </thead>
    <tbody>
  <tr v-for="kollektive in kollektive" :key="kollektive.id">
    <td>{{kollektive.name}}</td>
    <td>{{kollektive.genre}}</td>
  </tr>
  </tbody></table>
</template>

