export default class NavbarView {
    constructor() {
        this.navbarNav = document.getElementById('navbarNav');
    }

    updateNavbar(isLoggedIn) {
        const navItems = this.navbarNav.querySelectorAll('.nav-item');
        navItems.forEach((item) => {
            const link = item.querySelector('.nav-link');
            if (link.textContent === 'Реєстрація' || link.textContent === 'Вхід') {
                item.style.display = isLoggedIn ? 'none' : 'block';
            }
            if (link.textContent === 'Профіль') {
                item.style.display = isLoggedIn ? 'block' : 'none';
            }
        });
    }
}