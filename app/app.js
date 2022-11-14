'use strict';

const profileCorrection = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.overlay');
const popupClose = document.querySelector('.edit-form__close');

if (profileCorrection) {
    profileCorrection.addEventListener('click', function () {
        popupProfile.classList.remove('overlay__hidden');
    });
};

if (popupClose) {
    popupClose.addEventListener('click', function () {
        popupProfile.classList.add('overlay__hidden');
    });
};
