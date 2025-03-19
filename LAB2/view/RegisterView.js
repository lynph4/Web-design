export default class RegisterView {
  constructor() {
    this.form = document.getElementById('registrationForm');
    this.nameFeedback = document.getElementById('nameFeedback');
    this.emailFeedback = document.getElementById('emailFeedback');
    this.genderFeedback = document.getElementById('genderFeedback');
    this.birthdateFeedback = document.getElementById('birthdateFeedback');
    this.passwordFeedback = document.getElementById('passwordFeedback');
    this.confirmPasswordFeedback = document.getElementById('confirmPasswordFeedback');
    this.togglePassword = document.getElementById('togglePassword');
    this.passwordInput = document.getElementById('password');
    this.confirmPasswordInput = document.getElementById('confirmPassword');
    this.eyeIcon = document.getElementById('eyeIcon');
  }

  getFormData() {
    const formData = new FormData(this.form);
    return {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      gender: formData.get('gender'),
      birthdate: formData.get('birthdate'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    };
  }

  showFeedback(field, message) {
    this[`${field}Feedback`].textContent = message;
  }

  clearFeedback() {
    this.nameFeedback.textContent = '';
    this.emailFeedback.textContent = '';
    this.genderFeedback.textContent = '';
    this.birthdateFeedback.textContent = '';
    this.passwordFeedback.textContent = '';
    this.confirmPasswordFeedback.textContent = '';
  }

  bindTogglePassword(handler) {
    this.togglePassword.addEventListener('click', () => {
      handler(this.passwordInput, this.confirmPasswordInput, this.eyeIcon);
    });
  }
}