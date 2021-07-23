import { displayMessage } from "../utilities/message.js";
import { validatedInput } from "./validation.js";
import { loader, removeLoader } from "../utilities/loader.js";
import * as CONFIG from "../config.js";
import { _id } from "../utilities/helper.js";

const updateBtn = _id("updateNewInformation");
const body = document.querySelector('body');
export const updateUser = async function (form) {
  try {
    loader(body);
    const res = await fetch(`/user/settings`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${ localStorage.getItem( 'token' ) }`
      },
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error(`${res.statusText} (${res.status})`);
    const data = await res.json();
    if (data) {
      removeLoader();
      displayMessage(`Updated account...`, "success", 3, 'settings');
      // location.assign('/dashboard');
    }
  } catch (err) {
    removeLoader();
    displayMessage(`${err}`, "error", 3, 'settings');
  }
};
validatedInput();
if (updateBtn) {
  if (updateBtn.disabled === false) {
    updateBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const first_name = _id("settingInfo_firstName");
      const last_name = _id("settingInfo_lastName");
      const address1 = _id("settingInfo_address1");
      const address2 = _id("settingInfo_address2");
      const city = _id("settingInfo_city");
      const state = _id("settingInfo_state");
      const zip_code = _id("settingInfo_zipcode");
      const form = {
        first_name: first_name.value,
        last_name: last_name.value,
        address1: address1.value,
        address2: address2.value,
        city: city.value,
        state: state.value,
        zip_code: zip_code.value,
      };
      updateUser(form);
    });
  }

}
