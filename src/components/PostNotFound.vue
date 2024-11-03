<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="not-found">
    <h1>Post Not Found</h1>
    <p>Sorry, the post you're looking for doesn't exist.</p>
    <button @click="router.push('/posts')" class="back-button">
      Back to Posts
    </button>
  </div>
</template>

<style scoped>
.not-found {
  max-width: 800px;
  margin: 100px auto;
  text-align: center;
  padding: 20px;
}

.back-button {
  margin-top: 20px;
  padding: 8px 16px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>