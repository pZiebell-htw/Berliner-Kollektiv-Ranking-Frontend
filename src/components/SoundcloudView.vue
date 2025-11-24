<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{
  soundcloudUrl: string
}>()

const widgetId = ref(`sc-widget-${Date.now()}`)
let widget: any = null

onMounted(() => {
  loadSoundCloudWidget()
})

watch(() => props.soundcloudUrl, () => {
  if (widget) {
    widget.load(props.soundcloudUrl, { show_artwork: true })
  }
})

function loadSoundCloudWidget() {
  const script = document.createElement('script')
  script.src = 'https://w.soundcloud.com/player/api.js'
  script.onload = () => {
    const iframe = document.getElementById(widgetId.value) as HTMLIFrameElement
    widget = (window as any).SC.Widget(iframe)
  }
  document.head.appendChild(script)
}


function prev() { widget?.prev() }
function next() { widget?.next() }
</script>

<template>
  <div class="soundcloud-player">
    <iframe
      :id="widgetId"
      width="100%"
      height="166"
      scrolling="no"
      frameborder="no"
      :src="`https://w.soundcloud.com/player/?url=${encodeURIComponent(soundcloudUrl)}&show_artwork=true`"
    ></iframe>

    <div class="player-controls">
      <button @click="prev">Prev</button>
      <button @click="next">Next</button>
    </div>
  </div>
</template>

<style scoped>
.soundcloud-player {
  margin-top: 1rem;
}

.player-controls {
  width: 100%;
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.player-controls button {
  width: 50%;
  padding: 0.5rem 1rem;
  background: #FF5500;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-weight: 600;
}

.player-controls button:hover {
  background: #FF6A33;
}

</style>

