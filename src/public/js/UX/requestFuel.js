import { _id } from '../utilities/helper.js';
const currentProfilePercentage = document.querySelector('.profileContent__progressBar--percentage');
const requestFuelButton = document.querySelector('.profileContent__requestButton');
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
//// New Fuel Quote
const sendGetQuoteButton = _id('sendGetQuoteButton');
const sendRequestNewQuoteButton = _id('sendRequestNewQuoteButton');
let isGallonRequestedValid = null;
let isDeliveryDateValid = null;

const observe = new MutationObserver((mutations) => {
    mutations.forEach(mutate => {
        if (isGallonRequestedValid === null || isDeliveryDateValid === null) {
            sendGetQuoteButton.disabled = true;
            sendRequestNewQuoteButton.disabled = true;
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
    const gallonRequested = _id('newFuelQuote__gallonRequested');
    const deliveryDate = _id('newFuelQuote__dateDelivery');

    observe.observe(gallonRequested, config);
    observe.observe(deliveryDate, config);
    // set today's date is the minimum date that user select
    deliveryDate.min = new Date().toISOString().split("T")[0];

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
        }
        e.target.dataset.validated = "true";
        isDeliveryDateValid = true;
    })
}

export const getQuote = () => {
    const suggestedPrice = _id('newFuelQuote__suggestedPrice');
    const totalAmountDue = _id('newFuelQuote__totalAmountDue');
}



if (sendGetQuoteButton && sendRequestNewQuoteButton) {
    sendGetQuoteButton.disabled = true;
    sendRequestNewQuoteButton.disabled = true;
    requestNewQuoteButtonsHandler();
}