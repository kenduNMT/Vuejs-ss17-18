<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { posts } from '../data/posts';

const route = useRoute();
const router = useRouter();

const post = computed(() => {
  return posts.find(p => p.id === Number(route.params.id));
});
</script>

<template>
  <div v-if="post" class="post-detail">
    <button @click="router.push('/posts')" class="back-button">
      Back to Posts
    </button>
    <h1>{{ post.title }}</h1>
    <div class="content">
      {{ post.content }}
    </div>
  </div>
</template>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.back-button {
  margin-bottom: 20px;
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.content {
  line-height: 1.6;
}
</style>