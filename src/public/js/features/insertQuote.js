import { displayMessage } from "../utilities/message.js";
import { validatedInput } from "./validation.js";
import { loader, removeLoader } from "../utilities/loader.js";
import * as CONFIG from "../config.js";
import { _id } from "../utilities/helper.js";

const submitBtn = _id("sendRequestNewQuoteButton");
const body = document.querySelector('body');
export const insertQuote = async function (form) {
  try {
    loader(body);
    const res = await fetch(`/request-quote`, {
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
    // console.log( 'data:', data );
    if ( data ) {
      // removeLoader();
      displayMessage(`Submitted quote request...`, "success", 3, 'request-quote');
      location.assign('/quotes');
    }
  } catch (err) {
    removeLoader();
    displayMessage(`${err}`, "error", 3, 'settings');
  }
};
validatedInput();
if (submitBtn) {
  if (submitBtn.disabled === false) {
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const gallons = _id("newFuelQuote__gallonRequested");
      const delivery_date = _id("newFuelQuote__dateDelivery");
      const suggested_price = _id("newFuelQuote__suggestedPrice");
      const amount_due = _id("newFuelQuote__totalAmountDue");
      const form = {
        gallons: gallons.value,
        delivery_date: delivery_date.value,
        suggested_price: suggested_price.value,
        amount_due: amount_due.value
      };
      insertQuote(form);
    });
  }

}
