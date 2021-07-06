import { validatedSignup } from "./validation.js";
import { _id } from "../utilities/helper.js";
import { loader, removeLoader } from "../utilities/loader.js";
import * as CONFIG from "../config.js";
import { displayMessage } from "../utilities/message.js";
const signUpBtn = _id("signUpBtn");
const loginContainer = document.querySelector(".container");

export const signupUser = async (cusInfo) => {
  try {
    loader(loginContainer);
    const res = await fetch(`${CONFIG.API_URL}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(cusInfo),
    });
    if (!res.ok) throw new Error(`${res.statusText} (${res.status})`);
    const data = await res.json();
    if (data) {
      removeLoader();
      displayMessage(`Signing you up...`, "success", 3);
    }
  } catch (err) {
    removeLoader();
    displayMessage(`${err}`, "error", 3);
  }
};
validatedSignup();
if (signUpBtn) {

  if (signUpBtn.disabled === false) {
    signUpBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const signupEmail = _id("signupEmail");
      const signupPassword = _id("signupPassword");
      const cusInfo = {
        email: signupEmail.value,
        password: signupPassword.value,
      };
      signupUser(cusInfo);
      signupEmail.value = "";
      signupPassword.value = "";
    });
  }

}