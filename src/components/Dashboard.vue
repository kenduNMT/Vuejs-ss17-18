<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '../store/auth'

const router = useRouter()
const { logout } = useAuth()

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>

<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <h1>Admin Dashboard</h1>
      <button @click="handleLogout" class="logout-button">
        Logout
      </button>
    </header>

    <div class="dashboard-content">
      <h2>Welcome to Dashboard</h2>
      <p>You are logged in and can view this protected content.</p>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  padding: 20px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.logout-button {
  padding: 0.5rem 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #c82333;
}

.dashboard-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>