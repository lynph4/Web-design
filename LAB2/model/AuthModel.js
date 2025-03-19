export default class AuthModel {
  constructor() {
    this.users = JSON.parse(localStorage.getItem('users')) || [];
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
  }

  registerUser(userData) {
    if (this.users.some((user) => user.email === userData.email)) {
      throw new Error('Користувач із таким email уже існує');
    }
    this.users.push(userData);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  loginUser(email, password) {
    const user = this.users.find((u) => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Неправильний email або пароль');
    }
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    return user;
  }

  logoutUser() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return !!this.currentUser;
  }

  getAllUsers() {
    return this.users;
  }
}