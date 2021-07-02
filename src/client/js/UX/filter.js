import { _id } from "../utilities/helper.js";
const buttons = document.querySelectorAll('.contentHeader__controlButton');
const filterForm = document.querySelector('.contentFilter');

export const filterButtonHandler = () => {
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (index === 1 && filterForm.classList.contains('contentFilter--open')) {
                filterForm.classList.add('contentFilter--remove');
                setTimeout(() => {
                    filterForm.classList.remove('contentFilter--open');
                    filterForm.classList.remove('contentFilter--remove');

                }, 300)
            };
            if (index === 1) {
                filterForm.classList.add('contentFilter--open');
            }

        })
    })
}


if (buttons) {
    filterButtonHandler();
};