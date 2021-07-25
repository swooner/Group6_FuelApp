import { _id } from "../utilities/helper.js";
import { displayMessage } from "../utilities/message.js";

const logoutButton = _id('logoutButton');

export const logoutHandler = async () => {
    try {
        const result = await fetch(`/user/sign-out`);
        const data = await result.json();
        console.log(data);
        if (data.status === 'success') location.assign('/');
    } catch (error) {
    }
}
if (logoutButton) {
    logoutButton.addEventListener('click', (event) => {
        logoutHandler();
    });
}