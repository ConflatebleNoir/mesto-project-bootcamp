'use strict';

import { popupEditProfile, popupAddCard, imagePopup } from "./index.js";
import { keyHandler } from "./modal.js";

//Функция открытия попапов
export function openPopup(popup) {
    popup.classList.add('overlay');
    popup.classList.remove('overlay_hidden');
    document.addEventListener('keydown', (evt) => {
        keyHandler(evt, popupEditProfile);
        keyHandler(evt, popupAddCard);
        keyHandler(evt, imagePopup);
    });
};

//Функция сокрытия попапов
export function closePopup(popup) {
    popup.classList.add('overlay_hidden');
    document.removeEventListener('keydown', (evt) => {
        keyHandler(evt, popupEditProfile);
        keyHandler(evt, popupAddCard);
        keyHandler(evt, imagePopup);
    });
};

