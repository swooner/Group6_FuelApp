import { _id } from '../utilities/helper.js';
import { displayMessage } from '../utilities/message.js';
import { loader, removeLoader } from '../utilities/loader.js';
const body = document.querySelector('body');

const inputPhoto = _id('settingInfo_image');
export const uploadPhotoHandler = async () => {
    let image = _id('settingInfo_currentUserImage');
    let photoFile;
    const url = inputPhoto.getAttribute('href');
    const formData = new FormData();
    inputPhoto.addEventListener('change', (e) => {
        image.src = URL.createObjectURL(e.target.files[0]);
        photoFile = inputPhoto.files[0];
        //attach file into form
        formData.append('photo', photoFile);
        updateUserPhotoHandler(url, formData);
    });
}

const updateUserPhotoHandler = async (url, formData) => {
    try {
        loader(body);
        const result = await fetch(`${url}`, {
            method: `PATCH`,
            body: formData,
        });
        const data = await result.json();
        if (data.ok) {
            removeLoader();
            displayMessage(`${data.message}`, `${data.status}`, 3);
            setTimeout(() => {
                location.reload(true);

            }, 2500);
        } else {
            removeLoader();
            displayMessage(`${data.message}`, `${data.status}`, 3);
        }
    } catch (error) {
        displayMessage(`${error}`, `error`, 3);

    };
};

if (inputPhoto) {
    uploadPhotoHandler();
}