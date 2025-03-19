export default class LoginView {
    constructor() {
        this.form = document.getElementById('loginForm');
    }

    getFormData() {
        const formData = new FormData(this.form);
        return {
            email: formData.get('email'),
            password: formData.get('password'),
        };
    }
}