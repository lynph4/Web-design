export default class ProfileView {
  constructor() {
    this.userName = document.getElementById('userName');
    this.userEmail = document.getElementById('userEmail');
    this.userGender = document.getElementById('userGender');
    this.userBirthdate = document.getElementById('userBirthdate');
    this.logoutButton = document.querySelector('.btn-logout');
  }

  displayUser(user) {
    if (user) {
      this.userName.textContent = user.fullName;
      this.userEmail.textContent = user.email;
      this.userGender.textContent = user.gender === 'male' ? 'Чоловік' : 'Жінка';
      this.userBirthdate.textContent = user.birthdate;
    }
  }

  bindLogout(handler) {
    this.logoutButton.addEventListener('click', handler);
  }
}