'use strict';

import { closePopup } from './utils.js';
import { popups } from './index.js';

//Функция сокрытия окна, нажатием на Escape
export function handleEscapeKey(evt) {
    popups.forEach((popup) => {
        if (evt.key === 'Escape') {
            closePopup(popup);
        };
    });
};