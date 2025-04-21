import { createRouter, createWebHistory } from 'vue-router';
import Calculator from '../views/Calculator.vue';
import About from '../views/About.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Profile from '../views/Profile.vue';

const routes = [
  { path: '/', component: Calculator },
  { path: '/about', component: About },
  { path: '/register', component: Register, meta: { requiresGuest: true } },
  { path: '/login', component: Login, meta: { requiresGuest: true } },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !token) {
    return next('/');
  }

  if (to.meta.requiresGuest && token) {
    return next('/');
  }

  next();
});

export default router;
