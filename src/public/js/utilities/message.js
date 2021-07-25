import { _id } from "./helper.js";

const loginPage = document.querySelector(".login");
const pageWrapper = document.querySelector(".pageWrapper");
let availableParent;
loginPage ? availableParent = loginPage : availableParent = pageWrapper;
const messageArea = `
      <div class="message" id="message">
      <p></p>
      </div>`;
const createMessageArea = () => {
  availableParent.insertAdjacentHTML("afterbegin", messageArea);
};

const removeMessageArea = () => {
  document.querySelector('.message').remove();
};
export const displayMessage = (message, type, time = 2) => {
  createMessageArea();
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
