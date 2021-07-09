import { _id } from "../utilities/helper.js";
export const hamburgerHandler = () => {
    const hamburgerBtn = _id('navbarToggleBtn');
    if (hamburgerBtn) {
        const hamburger = _id('hamburger');
        const brandName = document.querySelector('.navbarBrand__name');
        const sidebar = document.querySelector('.sidebar');
        const sidebarMenu = document.querySelector('.sidebarMenu');

        hamburgerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            hamburger.classList.toggle('hamburger--active');
            brandName.classList.toggle('navbarBrand__name--collapsed');
            sidebarMenu.classList.toggle('sidebarMenu--collapsed');
        });
        sidebar.addEventListener('mouseover', (e) => {

            hamburger.classList.add('hamburger--active');
            brandName.classList.remove('navbarBrand__name--collapsed');
            sidebarMenu.classList.remove('sidebarMenu--collapsed');


        })
        sidebar.addEventListener('mouseleave', (e) => {
            hamburger.classList.toggle('hamburger--active');
            brandName.classList.toggle('navbarBrand__name--collapsed');
            sidebarMenu.classList.add('sidebarMenu--collapsed');
        })
    };
}


hamburgerHandler();
