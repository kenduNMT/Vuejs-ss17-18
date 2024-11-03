<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { onBeforeRouteLeave, useRouter } from 'vue-router';

const router = useRouter();

// Initial settings
const originalSettings = {
  username: 'johndoe',
  email: 'john@example.com',
  notifications: true,
  theme: 'light' as const
};

// Current form state
const settings = reactive({ ...originalSettings });

// Track if form has been modified
const formModified = ref(false);

// Track if form is currently being saved
const isSaving = ref(false);

// Compute if there are unsaved changes
const hasUnsavedChanges = computed(() => {
  return formModified.value &&
      (settings.username !== originalSettings.username ||
          settings.email !== originalSettings.email ||
          settings.notifications !== originalSettings.notifications ||
          settings.theme !== originalSettings.theme);
});

// Handle form changes
const handleChange = () => {
  formModified.value = true;
};

// Save changes
const saveChanges = async () => {
  isSaving.value = true;
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Update original settings
    Object.assign(originalSettings, settings);
    formModified.value = false;

    // Show success message
    alert('Settings saved successfully!');
  } catch (error) {
    alert('Error saving settings. Please try again.');
  } finally {
    isSaving.value = false;
  }
};

// Navigation guard
onBeforeRouteLeave((to, from, next) => {
  if (hasUnsavedChanges.value) {
    const confirmed = window.confirm(
        'You have unsaved changes. Are you sure you want to leave this page?'
    );
    next(confirmed);
  } else {
    next();
  }
});
</script>

<template>
  <div class="settings-page">
    <h1>User Settings</h1>

    <form @submit.prevent="saveChanges" class="settings-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input
            id="username"
            v-model="settings.username"
            type="text"
            @input="handleChange"
        />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
            id="email"
            v-model="settings.email"
            type="email"
            @input="handleChange"
        />
      </div>

      <div class="form-group checkbox">
        <label>
          <input
              v-model="settings.notifications"
              type="checkbox"
              @change="handleChange"
          />
          Enable Notifications
        </label>
      </div>

      <div class="form-group">
        <label for="theme">Theme:</label>
        <select
            id="theme"
            v-model="settings.theme"
            @change="handleChange"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div class="form-actions">
        <button
            type="button"
            @click="() => router.push('/')"
            :disabled="isSaving"
        >
          Cancel
        </button>
        <button
            type="submit"
            class="save-button"
            :disabled="isSaving || !hasUnsavedChanges"
        >
          {{ isSaving ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
    </form>

    <div v-if="hasUnsavedChanges" class="unsaved-warning">
      You have unsaved changes
    </div>
  </div>
</template>

<style scoped>
.settings-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.settings-form {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-group.checkbox input {
  margin: 0;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.save-button {
  background-color: #4CAF50;
  color: white;
}

.unsaved-warning {
  margin-top: 20px;
  padding: 10px;
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: 4px;
  color: #856404;
  text-align: center;
}
</style>