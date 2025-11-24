<script setup lang="ts">
interface Post {
  title: string;
  content: string;
  image?: string;
}

const username = 'pziebell';
const email = 'philipp@ziebell.de';
const profileImage = 'https://cdn-icons-png.flaticon.com/512/9706/9706583.png';

const posts: Post[] = [
  { title: 'First Event', content: 'Had an amazing time at the Berlin club!' },
  { title: 'Techno Night', content: 'Best beats ever!' },
  { title: 'House Party', content: 'Loved the vibes, great crowd.' },
];

</script>

<template>
  <header class="profile-header">
    <img :src="profileImage" alt="Profile Image" class="profile-image">
    <div class="profile-info">
      <h2 class="username">{{ username }}</h2>
      <p class="email">{{ email }}</p>
    </div>
  </header>

  <main class="posts-list">
    <h3>Your Posts</h3>
    <article class="post-card" v-for="(post, index) in posts" :key="index">
      <div class="post-content">
        <h4 class="post-title">{{ post.title }}</h4>
        <p class="post-text">{{ post.content }}</p>
      </div>
      <img v-if="post.image" :src="post.image" alt="Post Image" class="post-image">
    </article>
  </main>
</template>

<style>

.profile-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem 5%;
  background: color-mix(in srgb, var(--color-background) 80%, black);
  border-radius: 10px;
  border: 2px solid rgba(188, 89, 241, 0.36);
  margin: 3rem auto 2rem auto;
  width: 90%;
}

.profile-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(188, 89, 241, 0.36);
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.profile-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.profile-info .email {
  color: #aaa;
  font-size: 0.95rem;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 90%;
  margin: 0 auto 3rem auto;
  align-items: center;
}

.posts-list h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 1rem;
  text-align: center;
}

.post-card {
  display: flex;
  gap: 1rem;
  background: color-mix(in srgb, var(--color-background) 80%, black);
  border-radius: 8px;
  border: 2px solid rgba(188, 89, 241, 0.36);
  padding: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 90%;
}

.post-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}

.post-content {
  flex: 1;
}

.post-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
}

.post-text {
  color: #ccc;
  font-size: 0.9rem;
}

.post-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  border: 2px solid rgba(188, 89, 241, 0.36);
}
</style>

