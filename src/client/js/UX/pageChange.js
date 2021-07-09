import { _id } from "../utilities/helper.js";
import { renderChart } from "../UI/chart.js";

export const sidebarItems = document.querySelectorAll('.sidebarMenu__items');
export const clearActiveItem = () => {
    sidebarItems.forEach(item => {
        item.classList.remove('sidebarMenu__items--active');
    })
}

export const changePageHandler = () => {
    document.addEventListener('DOMContentLoaded', (e) => {
        e.preventDefault();
        clearActiveItem();

        const currentPage = e.target.URL.split('/')[(e.target.URL.split('/').length - 1)].replace('.html', '')
        sidebarItems.forEach(item => {
            if (!item.classList.contains('sidebarMenu__items--title')) {
                if (item.childNodes[1].dataset.page === currentPage) {
                    item.classList.add('sidebarMenu__items--active');
                } else {
                    item.classList.remove('sidebarMenu__items--active');
                };
            }
        })
    });
};


changePageHandler();