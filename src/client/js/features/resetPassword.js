import { _id } from "../utilities/helper.js";
const modalOverlay = document.querySelector('.forgotPasswordOverlay');
const forgotPasswordModal = document.querySelector('.forgotPasswordModal');
const submitResetPassword = _id('sendForgotPasswordEmail');
const cancelResetPassword = _id('cancelForgotPassword');
const forgotPasswordEmail = _id('forgotPasswordEmail');
const forgotPasswordLink = _id('forgotPasswordLink');

const closeResetPasswordModal = () => {
    forgotPasswordEmail.value = '';
    forgotPasswordModal.style.animation = "removeModal 200ms linear forwards";
    setTimeout(() => {
        modalOverlay.classList.remove('forgotPasswordOverlay--active');
        forgotPasswordModal.style.animation = '';
    }, 300);
}
export const resetPassword = () => {

    forgotPasswordLink.addEventListener('click', () => {
        modalOverlay.classList.add('forgotPasswordOverlay--active');
    });
    if (submitResetPassword || cancelResetPassword) {
        cancelResetPassword.addEventListener('click', () => {
            closeResetPasswordModal();
        });
        modalOverlay.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.classList.value.split(' ')[0] === 'forgotPasswordOverlay') {
                closeResetPasswordModal();
            }
        })
    }

};
if (modalOverlay) {
    resetPassword();
}