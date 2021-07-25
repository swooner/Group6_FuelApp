import { _id } from '../utilities/helper.js';
import { loader, removeLoader } from '../utilities/loader.js';
import { displayMessage } from '../utilities/message.js';
const updateNewInformationButton = _id('updateNewInformation');
const accountSettingsForm = _id('accountSettings__Form');
const body = document.querySelector('body');

export const updateUserInfoHandler = async () => {
    const url = accountSettingsForm.getAttribute('action');
    const userInfo = JSON.stringify({
        first_name: _id('settingInfo_firstName').value,
        last_name: _id('settingInfo_lastName').value,
        company: _id('settingInfo_companyName').value,
        email: _id('settingInfo_email').value,
        phone_number: _id('settingInfo_phoneNumber').value,
        street_number: _id('settingInfo_streetNumber').value,
        street_name: _id('settingInfo_streetName').value,
        city: _id('settingInfo_city').value,
        state: _id('settingInfo_state').value,
        zip_code: _id('settingInfo_zipcode').value,
        country: _id('settingInfo_country').value
    });

    try {
        loader(body);
        const res = await fetch(`${url}`, {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: userInfo,
        });
        const data = await res.json();
        if (data.ok) {
            removeLoader();
            displayMessage(`${data.message}`, `${data.status}`, 3);
            setTimeout(() => {
                location.reload(true);

            }, 3000);
        }
    } catch (error) {
        console.log(error);
    }
}

if (updateNewInformationButton || accountSettingsForm) {
    updateNewInformationButton.addEventListener('click', (event) => {
        event.preventDefault();
        updateUserInfoHandler();
    });

    ;
}