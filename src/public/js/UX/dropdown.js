import { _id } from "../utilities/helper.js";

const dropdownToggle = document.querySelectorAll('.dropdownToggle');
const dropdownMenu = document.querySelectorAll('.dropdownMenu')
const dropdownToggleButton = document.querySelector('.dropdownToggle__button');
const dropdownMenuLinks = document.querySelectorAll('.dropdownMenu__links');
const closedropdownMenu = () => {
    dropdownMenu.forEach(menu => {
        menu.classList.remove('dropdownMenu--show');
    });
};
const dropdownToggleButtonHandler = () => {
    dropdownToggleButton.style.transform = "rotate(0deg)";
    setTimeout(() => {
        dropdownToggleButton.style.transform = '';
        dropdownToggleButton.classList.remove('dropdownToggle--active');
    }, 300)
}

export const dropdownMenuHandler = () => {
    dropdownToggle.forEach((dropdownBtn, index) => {
        dropdownBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closedropdownMenu();
            dropdownMenu[index].classList.toggle('dropdownMenu--show');
            index === 1 ? dropdownToggleButton.classList.add('dropdownToggle--active') : false;
            if (index === 0 && dropdownToggleButton.classList.contains('dropdownToggle--active')) {
                dropdownToggleButtonHandler();
            }
        });
        if (dropdownMenu) {
            dropdownMenu.forEach((menu, index) => {
                menu.addEventListener('mouseleave', () => {
                    if (menu.classList.contains('dropdownMenu--show')) {
                        menu.classList.add('dropdownMenu--remove');
                        dropdownToggleButtonHandler();
                        setTimeout(() => {
                            menu.classList.remove('dropdownMenu--remove');
                            menu.classList.remove('dropdownMenu--show');
                        }, 300);
                    }
                })
            })
        }
    });



};


//Dropdown Action Menu

const dropdownMenuAction = document.querySelectorAll('.dropdownMenuAction__button');

export const dropdownMenuActionHandler = () => {
    dropdownMenuAction.forEach(dropdownMenu => {
        dropdownMenu.addEventListener('click', (e) => {
            const targetedDropdownMenu = e.target.parentNode.parentNode.children[1];
            if (targetedDropdownMenu.classList.contains('dropdownMenuAction--active')) {
                targetedDropdownMenu.classList.add('dropdownMenuAction--remove');
                setTimeout(() => {
                    targetedDropdownMenu.classList.remove('dropdownMenuAction--remove');
                    targetedDropdownMenu.classList.remove('dropdownMenuAction--active');
                }, 300)
            } else {

                targetedDropdownMenu.classList.add('dropdownMenuAction--active');
            }
        })
    })
}


if (dropdownToggle || dropdownMenuAction) {
    dropdownMenuActionHandler();
    dropdownMenuHandler();
};
