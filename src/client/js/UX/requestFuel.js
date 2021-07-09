import { _id } from '../utilities/helper.js';

const currentProfilePercentage = document.querySelector('.profileContent__progressBar--percentage');
const requestFuelButton = document.querySelector('.profileContent__requestButton');
//// New Fuel Quote
const gallonRequested = _id('newFuelQuote__gallonRequested');
const deliveryDate = _id('newFuelQuote__dateDelivery');
const suggestedPrice = _id('newFuelQuote__suggestedPrice');
const totalAmountDue = _id('newFuelQuote__totalAmountDue');

export const requestFuelHandler = () => {
    const currentPercentage = parseInt(currentProfilePercentage.closest('div').childNodes[1].dataset.currentPercentage.split('%')[0]);

    if (currentPercentage === 100) {
        requestFuelButton.classList.add('profileContent__requestButton--active');
        const activatedRequestButton = document.querySelector('.profileContent__requestButton--active');
        activatedRequestButton.childNodes[3].setAttribute('href', '/src/pages/request_fuel_quote.html');
    };


    if (gallonRequested) {
        gallonRequested.addEventListener('input', (e) => {
            suggestedPrice.value = `100000`;
            totalAmountDue.value = 1.5 * gallonRequested.value;
        });

    }


};


if (currentProfilePercentage || gallonRequested) {
    requestFuelHandler();
}