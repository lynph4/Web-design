import AuthModel from '../model/AuthModel.js';
import LoginView from '../view/LoginView.js';

export default class LoginController {
  constructor() {
    this.model = new AuthModel();
    this.view = new LoginView();
    this.bindEvents();
  }

  bindEvents() {
    this.view.form.addEventListener('submit', (e) => this.handleLogin(e));
  }

  handleLogin(event) {
    event.preventDefault();
    const data = this.view.getFormData();

    try {
      this.model.loginUser(data.email, data.password);
      alert('Вхід успішний!');
      window.location.href = 'profile.html';
    } catch (error) {
      alert(error.message);
    }
  }
}