'use strict';

const profileCorrection = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.overlay_hidden');
const popupClose = document.querySelector('.edit-form__close');

if (profileCorrection) {
    profileCorrection.addEventListener('click', function () {
        popupProfile.classList.add('overlay');
        popupProfile.classList.remove('overlay_hidden');
    });
};

if (popupClose) {
    popupClose.addEventListener('click', function () {
        popupProfile.classList.remove('overlay');
        popupProfile.classList.add('overlay_hidden');
    });
};
