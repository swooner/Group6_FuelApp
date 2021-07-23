import { _id } from "./helper.js";

const loginArea = _id("login");
const settingsArea = _id("settings");
const messageArea = `
      <div class="message" id="message">
      <p></p>
      </div>`;
const createMessageArea = ( page ) => {
  if ( page == 'settings') {
    settingsArea.insertAdjacentHTML("afterbegin", messageArea);
  }
  else {
    loginArea.insertAdjacentHTML("afterbegin", messageArea);
  }
};

const removeMessageArea = () => {
  document.querySelector('.message').remove();
};
export const displayMessage = (message, type, time = 2, page ) => {
  createMessageArea( page );
  const messageBox = _id("message");
  messageBox.classList.add(`message--active`, `message--${type}`);
  const content = document.querySelector(".message p");
  content.innerHTML = message;
  setTimeout(() => {
    messageBox.classList.add("message--remove");
    messageBox.classList.remove("message--active");
    removeMessageArea();
  }, time * 1000);
  messageBox.classList.remove("message--remove");
};
