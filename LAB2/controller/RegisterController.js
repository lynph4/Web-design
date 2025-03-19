import AuthModel from '../model/AuthModel.js';
import RegisterView from '../view/RegisterView.js';

export default class RegisterController {
  constructor() {
    this.model = new AuthModel();
    this.view = new RegisterView();
    this.bindEvents();
  }

  bindEvents() {
    this.view.form.addEventListener('submit', (e) => this.handleRegister(e));
    this.view.bindTogglePassword(this.togglePasswordVisibility);
  }

  handleRegister(event) {
    event.preventDefault();
    this.view.clearFeedback();

    const data = this.view.getFormData();

    if (!data.fullName) {
      this.view.showFeedback('name', 'Введіть ім’я');
      return;
    }
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      this.view.showFeedback('email', 'Введіть коректний email');
      return;
    }
    if (!data.gender) {
      this.view.showFeedback('gender', 'Оберіть стать');
      return;
    }
    if (!data.birthdate) {
      this.view.showFeedback('birthdate', 'Оберіть дату народження');
      return;
    }
    if (data.password.length < 6) {
      this.view.showFeedback('password', 'Пароль має бути не менше 6 символів');
      return;
    }
    if (data.password !== data.confirmPassword) {
      this.view.showFeedback('confirmPassword', 'Паролі не збігаються');
      return;
    }

    try {
      this.model.registerUser({
        fullName: data.fullName,
        email: data.email,
        gender: data.gender,
        birthdate: data.birthdate,
        password: data.password,
      });
      alert('Реєстрація успішна! Увійдіть у систему.');
      window.location.href = 'login.html';
    } catch (error) {
      this.view.showFeedback('email', error.message);
    }
  }

  togglePasswordVisibility(passwordInput, confirmPasswordInput, eyeIcon) {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    confirmPasswordInput.type = type;
    eyeIcon.classList.toggle('bi-eye-slash');
    eyeIcon.classList.toggle('bi-eye');
  }
}