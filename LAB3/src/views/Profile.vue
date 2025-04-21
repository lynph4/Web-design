<template>
  <div class="container-common container-profile">
    <h1 class="container-header">Мій профіль</h1>

    <table v-if="user" class="table table-bordered">
      <tbody>
        <tr>
          <th>Ім'я</th>
          <td>{{ user.fullName }}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>{{ user.email }}</td>
        </tr>
        <tr>
          <th>Стать</th>
          <td>{{ user.gender === 'male' ? 'Чоловік' : 'Жінка' }}</td>
        </tr>
        <tr>
          <th>Дата народження</th>
          <td>{{ user.birthdate }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else class="text-danger">
      <p>Помилка завантаження даних профілю</p>
    </div>

    <button class="btn btn-logout" @click="handleLogout">Вийти</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../axios';

const user = ref(null);
const router = useRouter();

async function loadProfile() {
  try {
    const response = await axios.get('/profile');
    user.value = response.data;
    console.log('Profile loaded:', user.value);
  } catch (err) {
    user.value = null;
    console.error('Profile load error:', err);
    alert('Помилка завантаження профілю: ' + (err.response?.data?.error || 'Невідома помилка'));
    await router.push('/login');
  }
}

async function handleLogout() {
  try {
    await axios.post('/logout');
    console.log('Before logout - token:', localStorage.getItem('token'));
    localStorage.removeItem('token');
    console.log('After logout - token:', localStorage.getItem('token'));
    window.dispatchEvent(new Event('logout'));
    alert('Вихід успішний!');
    await new Promise(resolve => setTimeout(resolve, 100));
    await router.push('/login');
    console.log('Navigated to /login');
  } catch (err) {
    console.error('Logout error:', err);
    alert('Помилка виходу: ' + (err.response?.data?.error || 'Невідома помилка'));
  }
}

loadProfile();
</script>