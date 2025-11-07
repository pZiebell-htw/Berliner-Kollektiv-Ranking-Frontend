<script setup lang="ts">

</script>

<template>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Events — Friday, 7 Nov</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
  <header>
    <h2>FR., 7 NOV</h2>
  </header>

  <main class="events-list">
    <!-- Event Card -->
    <article class="event-card">
      <img src="https://via.placeholder.com/600x200" alt="Event image" class="event-image">
      <div class="event-content">
        <h3 class="event-title">EVENT TITLE</h3>
        <p class="event-subtitle">Genre, Club Name, City</p>
        <div class="event-meta">
          <span class="tickets">🎟️ Tickets</span>
          <span class="attendees">👥 641</span>
        </div>
      </div>
    </article>

    <article class="event-card">
      <img src="https://via.placeholder.com/600x200" alt="Event image" class="event-image">
      <div class="event-content">
        <h3 class="event-title">ANOTHER EVENT</h3>
        <p class="event-subtitle">Techno, Bass, Berlin</p>
        <div class="event-meta">
          <span class="tickets">🎟️ Tickets</span>
          <span class="attendees">👥 517</span>
        </div>
      </div>
    </article>

    <article class="event-card">
      <img src="https://via.placeholder.com/600x200" alt="Event image" class="event-image">
      <div class="event-content">
        <h3 class="event-title">FOUR PLAY</h3>
        <p class="event-subtitle">House, Electro, Club X</p>
        <div class="event-meta">
          <span class="tickets">🎟️ Tickets</span>
          <span class="attendees">👥 999</span>
        </div>
      </div>
    </article>

  </main>
  </body>
</template>

<style scoped>
/* General Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #111;
  color: #eee;
  font-family: 'Inter', sans-serif;
  line-height: 1.5;
  padding: 1.5rem;
}

/* Header */
header {
  border-left: 4px solid #d00;
  padding-left: 1rem;
  margin-bottom: 2rem;
}

header h2 {
  font-size: 1.5rem;
  color: #ff3333;
  font-weight: 700;
  text-transform: uppercase;
}

/* Event List */
.events-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Event Card */
.event-card {
  display: flex;
  align-items: flex-start;
  background: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.event-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}

.event-image {
  width: 200px;
  height: 100%;
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
  color: #ff3333;
}

.event-meta .attendees {
  color: #aaa;
}

</style>
