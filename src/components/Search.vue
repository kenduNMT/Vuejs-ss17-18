<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const searchQuery = ref('')
const displayValue = ref('')

// Handle search
const handleSearch = () => {
  router.push({
    query: { q: searchQuery.value }
  })
}

// Watch for route query changes
watch(
    () => route.query.q,
    (newQuery) => {
      if (newQuery) {
        displayValue.value = newQuery
        searchQuery.value = newQuery
      } else {
        displayValue.value = ''
        searchQuery.value = ''
      }
    }
)

// Initialize from URL on component mount
onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q
    displayValue.value = route.query.q
  }
})
</script>

<template>
  <div class="search-container">
    <div class="search-form">
      <input
          type="text"
          v-model="searchQuery"
          class="search-input"
          placeholder="Enter search term..."
      >
      <button
          @click="handleSearch"
          class="search-button"
      >
        Tìm kiếm
      </button>
    </div>

    <div class="search-result" v-if="displayValue">
      <p>Value: {{ displayValue }}</p>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.search-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.search-button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.search-button:hover {
  background-color: #45a049;
}

.search-result {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

</style>