<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../store/auth'
import {redirectToLastVisitedUrl} from "../router";

const router = useRouter()
const { login } = useAuth()

const username = ref('')
const password = ref('')
const error = ref('')

const handleLogin = () => {
  if (username.value && password.value) {
    login()
    localStorage.setItem('isAuthenticated', 'true') // Set authentication status
    redirectToLastVisitedUrl(router) // Use the new function
  } else {
    error.value = 'Please enter both username and password'
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Login</h2>
      <div class="form-group">
        <label for="username">Username</label>
        <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter username"
        >
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter password"
        >
      </div>
      <button @click="handleLogin" class="login-button">
        Login
      </button>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.login-button:hover {
  background-color: #45a049;
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
  text-align: center;
}
</style>