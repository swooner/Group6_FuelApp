import { _id } from "../utilities/helper.js";
import { renderChart } from "../UI/chart.js";
const allPages = document.querySelectorAll('.content');

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
    //     window.addEventListener('hashchange', (e) => {
    //         e.preventDefault();
    //         // clearActiveItem();
    //         // let pageChange = e.newURL.split('#')[1];
    //         // allPages.forEach(page => {

    //         //     if (page.id === pageChange) {
    //         //         const newPage = _id(`${pageChange}`);
    //         //         newPage.classList.add(`content--active`);

    //         //     } else {
    //         //         page.className = 'content';
    //         //     }

    //         // });
    //         // sidebarItems.forEach(item => {

    //         //     if (!item.classList.contains('sidebarMenu__items--title')) {
    //         //         if (item.childNodes[1].dataset.page === pageChange) {
    //         //             item.classList.add('sidebarMenu__items--active');
    //         //         } else {
    //         //             item.classList.remove('sidebarMenu__items--active');
    //         //         };
    //         //     }
    //         // })

    //     });
};


changePageHandler();