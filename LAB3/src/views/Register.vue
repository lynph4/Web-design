<template>
  <div class="container-common container-register">
    <h1 class="container-header">Реєстрація</h1>

    <form @submit.prevent="handleRegister">
      <FormField label="Ім'я" id="fullName" v-model="form.fullName" type="text" placeholder="Введіть ваше ім'я"
        :error="errors.fullName" required />

      <FormField label="Email" id="email" v-model="form.email" type="email" placeholder="Введіть ваш email"
        :error="errors.email || error" required />

      <div class="form-group">
        <label>Стать</label>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="genderMale" value="male" v-model="form.gender" name="gender"
            required />
          <label class="form-check-label" for="genderMale">Чоловік</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" id="genderFemale" value="female" v-model="form.gender"
            name="gender" required />
          <label class="form-check-label" for="genderFemale">Жінка</label>
        </div>
        <div class="form-feedback" v-if="errors.gender">{{ errors.gender }}</div>
      </div>

      <FormField label="Дата народження" id="birthdate" v-model="form.birthdate" type="date" :error="errors.birthdate"
        required />

      <div class="form-group password-container">
        <label for="password">Пароль</label>
        <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password" v-model="form.password"
          placeholder="Введіть пароль" required />
        <span class="toggle-password" @click="togglePassword">
          <i :class="showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'" id="eyeIcon"></i>
        </span>
        <div class="form-feedback" v-if="errors.password">{{ errors.password }}</div>
      </div>

      <div class="form-group password-container">
        <label for="confirmPassword">Повторіть пароль</label>
        <input :type="showPassword ? 'text' : 'password'" class="form-control" id="confirmPassword"
          v-model="form.confirmPassword" placeholder="Повторіть пароль" required />
        <div class="form-feedback" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</div>
      </div>

      <button type="submit" class="btn btn-primary">Зареєструватися</button>
    </form>

    <div class="container-footer">
      <p>Уже є акаунт? <router-link to="/login">Увійти</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import FormField from '../components/FormField.vue';

const router = useRouter();

const form = reactive({
  fullName: '',
  email: '',
  gender: '',
  birthdate: '',
  password: '',
  confirmPassword: '',
});

const errors = reactive({});
const error = ref('');
const showPassword = ref(false);

onMounted(() => {
  if (localStorage.getItem('token')) {
    router.push('/');
  }
});

const passwordsMatch = computed(() => form.password === form.confirmPassword);

function togglePassword() {
  showPassword.value = !showPassword.value;
}

async function handleRegister() {
  Object.keys(errors).forEach((key) => delete errors[key]);
  error.value = '';

  if (!passwordsMatch.value) {
    errors.confirmPassword = 'Паролі не збігаються';
    return;
  }

  try {
    await axios.post('/api/register', form);
    alert('Реєстрація успішна! Увійдіть у систему.');
    router.push('/login');
  } catch (err) {
    const errorData = err.response?.data;
    if (errorData?.errors?.email?.toLowerCase().includes('email уже існує')) {
      errors.email = 'Користувач із таким email вже існує';
    } else if (errorData?.errors) {
      Object.assign(errors, errorData.errors);
    } else {
      error.value = errorData?.message || errorData?.error || 'Помилка реєстрації';
    }
  }
}
</script>

<style scoped></style>
