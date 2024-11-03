<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentRoute = ref(router.currentRoute.value.name);
</script>

<template>
  <div class="admin-layout">
    <nav class="nav-menu">
      <router-link
          to="/admin"
          class="nav-item"
          :class="{ active: currentRoute === 'Dashboard' }"
      >
        Dashboard
      </router-link>
      <router-link
          to="/admin/manager-user"
          class="nav-item"
          :class="{ active: currentRoute === 'Users' }"
      >
        User
      </router-link>
      <router-link
          to="/admin/manager-product"
          class="nav-item"
          :class="{ active: currentRoute === 'Products' }"
      >
        Product
      </router-link>
      <router-link
          to="/admin/setting"
          class="nav-item"
          :class="{ active: currentRoute === 'Settings' }"
      >
        Setting
      </router-link>
    </nav>
    <main class="content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.nav-menu {
  width: 200px;
  padding: 20px;
  background-color: #f8f9fa;
  border-right: 1px solid #dee2e6;
}

.nav-item {
  display: block;
  padding: 10px;
  margin-bottom: 5px;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
}

.nav-item:hover {
  background-color: #e9ecef;
}

.nav-item.active {
  background-color: #dc3545;
  color: white;
}

.content {
  flex: 1;
  padding: 20px;
}
</style>