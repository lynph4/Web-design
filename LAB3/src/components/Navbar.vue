<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light px-3">
    <router-link class="navbar-brand fw-bold d-flex justify-content-center align-items-center" to="/">
      <img src="/logo.png" alt="Calculator Logo" width="30" /> Калькулятор
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/" :class="{ 'active fw-bold': $route.path === '/' }">Головна</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about" :class="{ 'active fw-bold': $route.path === '/about' }">Про
            сайт</router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link class="nav-link" to="/register"
            :class="{ 'active fw-bold': $route.path === '/register' }">Реєстрація</router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link class="nav-link" to="/login"
            :class="{ 'active fw-bold': $route.path === '/login' }">Вхід</router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <router-link class="nav-link" to="/profile"
            :class="{ 'active fw-bold': $route.path === '/profile' }">Профіль</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

const token = ref(localStorage.getItem('token'));

const isAuthenticated = computed(() => {
  const value = !!token.value;
  console.log('isAuthenticated checked:', value, 'token:', token.value);
  return value;
});

function updateToken() {
  token.value = localStorage.getItem('token');
  console.log('Token updated:', token.value);
}

function handleStorageChange(event) {
  if (event.key === 'token') {
    updateToken();
  }
}

function handleAuthEvent() {
  updateToken();
}

onMounted(() => {
  window.addEventListener('storage', handleStorageChange);
  window.addEventListener('login', handleAuthEvent);
  window.addEventListener('logout', handleAuthEvent);
});

onUnmounted(() => {
  window.removeEventListener('storage', handleStorageChange);
  window.removeEventListener('login', handleAuthEvent);
  window.removeEventListener('logout', handleAuthEvent);
});

useRoute();
</script>