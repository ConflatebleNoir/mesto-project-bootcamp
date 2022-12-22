'use strict';

import { closePopup } from './utils.js';
import { popups } from './index.js';

//Функция сокрытия окна, нажатием на Escape
export function handleEscapeKey(evt) {
    if (evt.key === 'Escape') {
        popups.forEach((popup) => {
            closePopup(popup);
        });
    };
};