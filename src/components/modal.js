'use strict';

import { closePopup } from './utils.js';

//Функция сокрытия окна, нажатием на Escape
export function handleEscapeKey(evt) {
    const popupEsc = document.querySelectorAll('.popup');
    popupEsc.forEach((popup) => {
        if (evt.key === 'Escape') {
            closePopup(popup);
        };
    });
};