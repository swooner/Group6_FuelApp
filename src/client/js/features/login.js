import { displayMessage } from "../utilities/message.js";
import { validatedInput } from "./validation.js";
import { loader, removeLoader } from "../utilities/loader.js";
import * as CONFIG from "../config.js";
import { _id } from "../utilities/helper.js";

const signInBtn = _id("signInBtn");
const body = document.querySelector('body');
export const loginUser = async function (credential) {
  try {
    loader(body);
    const res = await fetch(`${CONFIG.API_URL}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(credential),
    });
    if (!res.ok) throw new Error(`${res.statusText} (${res.status})`);
    const data = await res.json();
    if (data) {
      removeLoader();
      displayMessage(`Logging you in...`, "success", 3);
      location.assign('/src/pages/dashboard.html');
    }
  } catch (err) {
    removeLoader();
    displayMessage(`${err}`, "error", 3);
  }
};
validatedInput();
if (signInBtn) {
  if (signInBtn.disabled === false) {
    signInBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const email = _id("email");
      const password = _id("password");
      const credential = {
        email: email.value,
        password: password.value,
      };
      loginUser(credential);
      email.value = "";
      password.value = "";
    });
  }

}
