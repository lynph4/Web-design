import AuthModel from '../model/AuthModel.js';
import ProfileView from '../view/ProfileView.js';

export default class ProfileController {
    constructor() {
        this.model = new AuthModel();
        this.view = new ProfileView();
        this.init();
        this.bindEvents();
    }

    init() {
        if (!this.model.isLoggedIn()) {
            alert('Будь ласка, увійдіть у систему');
            window.location.href = 'login.html';
        } else {
            this.view.displayUser(this.model.getCurrentUser());
        }
    }

    bindEvents() {
        this.view.bindLogout(() => this.handleLogout());
    }

    handleLogout() {
        this.model.logoutUser();
        alert('Ви вийшли з акаунта!');
        window.location.href = 'login.html';
    }
}