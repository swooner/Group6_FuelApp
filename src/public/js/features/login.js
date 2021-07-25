import { displayMessage } from "../utilities/message.js";
import { validatedInput } from "./validation.js";
import { loader, removeLoader } from "../utilities/loader.js";
import { _id } from "../utilities/helper.js";

const signInBtn = _id("signInBtn");
const body = document.querySelector('body');

export const loginUser = async function (credential) {
  try {
    loader(body);
    const res = await fetch(`/user/sign-in`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(credential),
    });
    const data = await res.json();
    removeLoader();
    if (data.ok) {
      displayMessage(`${data.message}`, `${data.status}`, 3);
      const user = data.data.user;
      // console.log(user);
      if (user.role_name === "administrator") {
        location.assign('/dashboard');
      } else if (user.role_name === "customer" && user.profile_percentage < 1) {
        location.assign('/user/settings');
      }
    } else {
      displayMessage(`${data.message}`, `${data.status}`, 3);

    }

  } catch (err) {
    removeLoader();
    displayMessage(`${err}`, `error`, 3);
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
