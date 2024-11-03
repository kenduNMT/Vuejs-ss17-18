<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/contact">Contact</router-link>
      <router-link to="/search">Search</router-link>
    </nav>
    <Suspense>
      <template #default>
        <router-view></router-view>
      </template>
      <template #fallback>
        <div class="loading">Loading...</div>
      </template>
    </Suspense>
  </div>
</template>

<style>
#app {
  font-family: Arial, sans-serif;
  padding: 20px;
}

nav {
  margin-bottom: 20px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #2c3e50;
}

nav a.router-link-active {
  color: #42b983;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}
</style>
<script setup lang="ts">
</script>