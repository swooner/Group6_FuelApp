import { validatedSignup } from "./validation.js";
import { _id } from "../utilities/helper.js";
import { loader, removeLoader } from "../utilities/loader.js";
import { displayMessage } from "../utilities/message.js";
const signUpBtn = _id("signUpBtn");
const body = document.querySelector('body');

export const signupUser = async (cusInfo) => {
  try {
    loader(body);
    const res = await fetch(`/user/sign-up`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(cusInfo),
    });
    const data = await res.json();
    removeLoader();
    console.log(data);
    if (data.ok === true) {
      displayMessage(`${data.message}`, "success", 3);
    } else {
      displayMessage(`${data.message}`, "error", 3);

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
      const signupConfirmPassword = _id("signupConfirmPassword");
      const cusInfo = {
        email: signupEmail.value,
        password: signupPassword.value,
        confirm_password: signupConfirmPassword.value,
      };
      signupUser(cusInfo);
      signupEmail.value = "";
      signupPassword.value = "";
      signupConfirmPassword.value = "";
    });
  }

}