import AuthModel from '../model/AuthModel.js';
import NavbarView from '../view/NavbarView.js';

export default class NavbarController {
    constructor() {
        this.model = new AuthModel();
        this.view = new NavbarView();
        this.updateNavbar();
    }

    updateNavbar() {
        const isLoggedIn = this.model.isLoggedIn();
        this.view.updateNavbar(isLoggedIn);
    }
}