<template>
  <div class="container-common container-login">
    <h1 class="container-header">Вхід</h1>

    <form @submit.prevent="handleLogin">
      <FormField label="Email" id="email" v-model="form.email" type="email" placeholder="Введіть ваш email"
        :error="errors.email" required />

      <PasswordInput label="Пароль" id="password" v-model="form.password" placeholder="Введіть пароль"
        :error="errors.password" required />

      <button type="submit" class="btn btn-primary">Увійти</button>
    </form>

    <div class="container-footer">
      <p>
        Ще не маєте акаунта? <router-link to="/register">Зареєструватися</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import axios from '../axios';
import FormField from '../components/FormField.vue';
import PasswordInput from '../components/PasswordInput.vue';

const form = reactive({
  email: '',
  password: '',
});

const errors = reactive({});
const router = useRouter();

onMounted(() => {
  if (localStorage.getItem('token')) {
    router.push('/');
  }
});

async function handleLogin() {
  Object.keys(errors).forEach((key) => delete errors[key]);

  if (!form.email || !form.password) {
    alert('Email і пароль обов’язкові');
    return;
  }

  try {
    const response = await axios.post('/login', form);
    const token = response.data.token;
    console.log('Login - saving token:', token);
    localStorage.setItem('token', token);
    console.log('Login - token saved:', localStorage.getItem('token'));
    window.dispatchEvent(new Event('login'));
    alert('Вхід успішний!');
    await new Promise(resolve => setTimeout(resolve, 100));
    await router.replace('/profile');
    console.log('Navigated to /profile');
  } catch (err) {
    const errorMessage = err.response?.data?.error || 'Помилка входу';
    console.error('Login error:', err);
    alert(errorMessage);
    if (err.response?.data?.errors) {
      Object.assign(errors, err.response.data.errors);
    }
  }
}
</script>