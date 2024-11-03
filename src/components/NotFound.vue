<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => {
  console.log('Attempted to access invalid path:', route.path)
})
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <div class="content">
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <router-link to="/" class="home-link">
        Go back to Home
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 120px;
  margin: 0;
  color: #e74c3c;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.content {
  margin-top: 20px;
}

h2 {
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 10px;
}

p {
  color: #666;
  margin-bottom: 20px;
}

.home-link {
  display: inline-block;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.home-link:hover {
  background-color: #2980b9;
}
</style>