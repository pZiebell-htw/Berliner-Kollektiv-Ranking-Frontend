<script setup lang="ts">
  import AddButton from '@/components/AddButton.vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const navigateToAddCollective = () => {
    router.push('/add')
  }

  interface Event {
  title: string;
  subtitle: string;
  image: string;
  tickets: number;
  attendees: number;
}

const events: Event[] = [
  { title: 'FOUR PLAY', subtitle: 'House, Electro, Club X', image: 'https://www.deejay.de/images/xl/8/7//1037887.jpg', tickets: 0, attendees: 999 },
  { title: 'NIGHT BEATS', subtitle: 'Techno, Bass, Berlin', image: 'https://www.deejay.de/images/xl/8/7//1037887.jpg', tickets: 0, attendees: 412 },
  { title: 'DEEP WAVES', subtitle: 'House, Electro, Amsterdam', image: 'https://www.deejay.de/images/xl/8/7//1037887.jpg', tickets: 0, attendees: 875 },
  { title: 'BASS LAB', subtitle: 'Techno, Minimal, London', image: 'https://www.deejay.de/images/xl/8/7//1037887.jpg', tickets: 0, attendees: 653 },
  { title: 'ELECTRO CITY', subtitle: 'Electro, House, Paris', image: 'https://www.deejay.de/images/xl/8/7//1037887.jpg', tickets: 0, attendees: 738 },
  { title: 'TECH VIBES', subtitle: 'Techno, Dark, Berlin', image: 'https://www.deejay.de/images/xl/8/7//1037887.jpg', tickets: 0, attendees: 921 },
  { title: 'MIDNIGHT RAVERS', subtitle: 'Techno, Dark, Berlin', image: 'https://www.deejay.de/images/xl/8/7//1037887.jpg', tickets: 0, attendees: 534 },
  { title: 'SOUNDWAVE', subtitle: 'Electro, House, Amsterdam', image: 'https://www.deejay.de/images/xl/8/7//1037887.jpg', tickets: 0, attendees: 762 },
  { title: 'BASSLINE NIGHT', subtitle: 'Techno, Minimal, London', image: 'https://www.deejay.de/images/xl/8/7//1037887.jpg', tickets: 0, attendees: 489 },
  { title: 'ELECTRIC FUSION', subtitle: 'Electro, House, Paris', image: 'https://www.deejay.de/images/xl/8/7//1037887.jpg', tickets: 0, attendees: 681 },
  { title: 'DARKROOM BEATS', subtitle: 'Techno, Dark, Berlin', image: 'https://www.deejay.de/images/xl/8/7//1037887.jpg', tickets: 0, attendees: 945 },
  { title: 'NEON PULSE', subtitle: 'House, Electro, Amsterdam', image: 'https://www.deejay.de/images/xl/8/7//1037887.jpg', tickets: 0, attendees: 812 },
  { title: 'UNDERGROUND VIBES', subtitle: 'Techno, Minimal, Berlin', image: 'https://www.deejay.de/images/xl/8/7//1037887.jpg', tickets: 0, attendees: 679 },
  { title: 'SYNTH CITY', subtitle: 'Electro, House, London', image: 'https://www.deejay.de/images/xl/8/7//1037887.jpg', tickets: 0, attendees: 734 },
  { title: 'TECHNO TEMPLE', subtitle: 'Techno, Dark, Berlin', image: 'https://www.deejay.de/images/xl/8/7//1037887.jpg', tickets: 0, attendees: 888 },
  { title: 'BASS MACHINE', subtitle: 'Techno, Minimal, Amsterdam', image: 'https://www.deejay.de/images/xl/8/7//1037887.jpg', tickets: 0, attendees: 563 },
];


</script>

<template>
  <header>
    <h2>Top Ranking Collectives</h2>
  </header>
  <div class="add-button-container">
    <AddButton @click="navigateToAddCollective"> </AddButton>
  </div>

  <main class="events-list">

    <article class="event-card" v-for="(event, index) in events" :key="index">
      <img :src="event.image" :alt="event.title" class="event-image">
      <div class="event-content">
        <h3 class="event-title">{{ event.title }}</h3>
        <p class="event-subtitle">{{ event.subtitle }}</p>
        <div class="event-meta">
          <span class="tickets">🎟️ Tickets</span>
          <span class="attendees">👥 {{ event.attendees }}</span>
        </div>
      </div>
    </article>
  </main>
</template>

<style>

.add-button-container {
  display: flex;
  justify-content: flex-end;
  padding-right: 5%;
}


header h2 {
  margin-top: 7rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
}

.events-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 90%;
  margin: 2rem auto;
}

.event-card {
  height: 23vh;
  display: flex;
  align-items: flex-start;
  background: color-mix(in srgb, var(--color-background) 80%, black);
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid rgba(188, 89, 241, 0.36);
  width: 90%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.event-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}

.event-image {
  width: 200px;
  height: auto;
  object-fit: cover;
}

.event-content {
  padding: 1rem;
  flex: 1;
}

.event-title {
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  color: #fff;
}

.event-subtitle {
  color: #aaa;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.event-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ccc;
  font-size: 0.85rem;
}

.event-meta .tickets {
  color: #ff33cc;
}

.event-meta .attendees {
  color: #aaa;
}

</style>
