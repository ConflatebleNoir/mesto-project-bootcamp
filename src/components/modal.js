'use strict';

import { closePopup } from './utils.js';

//Функция сокрытия окна, нажатием на Escape
export function handleEscapeKey(evt) {
    if (evt.key === 'Escape') {
        const popupEsc = document.querySelector('.popup');
        closePopup(popupEsc);
    };
};