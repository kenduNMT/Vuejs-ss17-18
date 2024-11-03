<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { posts } from '../data/posts';

const router = useRouter();
const route = useRoute();

const saveScrollPosition = () => {
  route.meta.savedPosition = window.scrollY;
};

onMounted(() => {
  // Restore scroll position if returning from post detail
  if (route.meta.savedPosition) {
    window.scrollTo({
      top: route.meta.savedPosition,
      behavior: 'smooth'
    });
  }

  window.addEventListener('scroll', saveScrollPosition);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', saveScrollPosition);
});
</script>

<template>
  <div class="post-list">
    <h1>Blog Posts</h1>
    <div
        v-for="post in posts"
        :key="post.id"
        class="post-card"
        @click="router.push(`/posts/${post.id}`)"
    >
      <h2>{{ post.title }}</h2>
      <p>{{ post.content.substring(0, 200) }}...</p>
    </div>
  </div>
</template>

<style scoped>
.post-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.post-card {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
}

.post-card:hover {
  background-color: #f5f5f5;
}
</style>