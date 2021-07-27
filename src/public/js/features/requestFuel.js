import { _id, getTodayDate } from '../utilities/helper.js';
import { displayMessage } from '../utilities/message.js';
import { loader, removeLoader } from '../utilities/loader.js';
const currentProfilePercentage = document.querySelector('.profileContent__progressBar--percentage');
const requestFuelButton = document.querySelector('.profileContent__requestButton');
const body = document.querySelector('body');
//// New Fuel Quote
const sendGetQuoteButton = _id('sendGetQuoteButton');
const sendRequestNewQuoteButton = _id('sendRequestNewQuoteButton');
const gallonRequested = _id('newFuelQuote__gallonRequested');
const deliveryDate = _id('newFuelQuote__dateDelivery');
const suggestedPrice = _id('newFuelQuote__suggestedPrice');
const totalAmountDue = _id('newFuelQuote__totalAmountDue');
let isGallonRequestedValid = null;
let isDeliveryDateValid = null;

export const requestFuelHandler = () => {
    const currentPercentage = parseInt(currentProfilePercentage.closest('div').childNodes[0].dataset.currentPercentage.split('%')[0]);
    if (currentPercentage === 100) {
        requestFuelButton.classList.add('profileContent__requestButton--active');
        const activatedRequestButton = document.querySelector('.profileContent__requestButton--active');
        activatedRequestButton.childNodes[1].setAttribute('href', '/user/request_fuel_quote');
    };
};
if (currentProfilePercentage) {
    requestFuelHandler();
}


const observe = new MutationObserver((mutations) => {
    mutations.forEach(mutate => {
        if (isGallonRequestedValid === null || isDeliveryDateValid === null) {
            sendGetQuoteButton.disabled = true;
            sendRequestNewQuoteButton.disabled = true;
            sendGetQuoteButton.classList.add('button--disabled');
            sendRequestNewQuoteButton.classList.add('button--disabled');

        }
        if (mutate.target.id === 'newFuelQuote__gallonRequested' && mutate.target.dataset.validated !== "null") {
            isGallonRequestedValid = true;
        } else if (mutate.target.id === 'newFuelQuote__dateDelivery' && mutate.target.dataset.validated !== "null") {
            isDeliveryDateValid = true;
        }
        if (isDeliveryDateValid && isGallonRequestedValid) {
            sendGetQuoteButton.disabled = false;
            sendGetQuoteButton.classList.remove('button--disabled');
        }
    });
});
// configuration for observation function
const config = { attributes: true };
export const requestNewQuoteButtonsHandler = () => {
    observe.observe(gallonRequested, config);
    observe.observe(deliveryDate, config);
    // set today's date is the minimum date that user select
    deliveryDate.min = new Date().toISOString().split("T")[0];

    gallonRequested.addEventListener('focusout', (e) => {
        if (e.target.value <= 0) {
            e.target.dataset.validated = "null";
            isGallonRequestedValid = null;
            displayMessage('Gallons requested must be at least 1', 'error', 3);
            e.target.value = 1;
        }
    });
    deliveryDate.addEventListener('focusout', (e) => {

        const today = getTodayDate();
        if (new Date(e.target.value - 1) < new Date()) {
            displayMessage('Cannot select date in the past', 'error', 3);
            e.target.dataset.validated = "null";
            isDeliveryDateValid = null;
            e.target.value = today;
        };
    })


    gallonRequested.addEventListener('input', (e) => {
        if (e.target.value.trim().length === 0) {
            e.target.dataset.validated = "null";
            isGallonRequestedValid = null;
            return;
        }
        e.target.dataset.validated = "true";
        isGallonRequestedValid = true;
    });
    deliveryDate.addEventListener('input', (e) => {
        if (e.target.value.trim().length === 0) {
            e.target.dataset.validated = "null";
            isDeliveryDateValid = null;
            return;
        } else if (e.target.value < getTodayDate()) {
            e.target.dataset.validated = "null";
            isDeliveryDateValid = null;
            displayMessage('Cannot select date in the past', 'error', 3);

            return;
        }
        e.target.dataset.validated = "true";
        isDeliveryDateValid = true;
    })
}




export const getQuote = async () => {

    const url = sendGetQuoteButton.getAttribute('href');
    const reqBody = {
        gallons: gallonRequested.value,
        delivery_date: deliveryDate.value,
    }
    try {
        loader(body);
        const result = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(reqBody),
        });
        const data = await result.json();
        if (data.ok) {
            removeLoader();
            displayMessage(`${data.message}`, `${data.status}`, 2);
            suggestedPrice.value = data.estimate.suggested_price_per_gallon;
            totalAmountDue.value = data.estimate.totalAmountDue;
            sendRequestNewQuoteButton.disabled = false;
            sendRequestNewQuoteButton.classList.remove('button--disabled');
        } else {
            removeLoader();
            displayMessage(`${data.message}`, `${data.status}`, 2);

        }
    } catch (err) {
        displayMessage(`${err}`, `error`, 2);
    };

};
export const submitRequestHandler = async () => {
    const url = sendRequestNewQuoteButton.getAttribute('href');
    const quote = {
        gallons: gallonRequested.value,
        delivery_date: deliveryDate.value,
        suggested_price: suggestedPrice.value,
        amount_due: totalAmountDue.value
    };
    try {
        loader(body);
        const result = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(quote),
        });
        const data = await result.json();
        if (data.ok) {
            removeLoader();
            displayMessage(`${data.message}`, `${data.status}`, 3);
            setTimeout(() => {
                location.assign('/user/profile');
            }, 3000)
        } else {
            removeLoader();
            displayMessage(`${data.message}`, `${data.status}`, 3);
        }

    } catch (error) {
        removeLoader();
        displayMessage(`${error}`, `error`, 3);
    }
}

if (sendGetQuoteButton && sendRequestNewQuoteButton) {
    sendGetQuoteButton.disabled = true;
    sendRequestNewQuoteButton.disabled = true;
    requestNewQuoteButtonsHandler();
    sendGetQuoteButton.addEventListener('click', (e) => {
        e.preventDefault();
        getQuote();
    });
    sendRequestNewQuoteButton.addEventListener('click', (e) => {
        e.preventDefault();
        submitRequestHandler();
    })
}