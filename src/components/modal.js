'use strict';

import {
    imagePopup,
    imageElement,
    imageTitle,
} from './variables.js';
import { openPopup, closePopup } from './utils.js';

//Функция закрытия попапов кликом/тапом на оверлей
export function closePopupByOverlayClick(evt, popup, form) {
    const abroad = evt.composedPath().includes(form);
    if (!abroad) {
        closePopup(popup);
    };
};

//Функция сокрытия окна, нажатием на Escape
export function keyHandler(evt) {
    if (evt.key === 'Escape') {
        const popupEsc = document.querySelector('.overlay')
        closePopup(popupEsc);
    };
    document.removeEventListener('keydown', keyHandler);
};

//Функция вывода изображения карточки в виде popup
export function imagePopupToggle(item, title) {
    //открываем
    item.addEventListener('click', () => {
        imageElement.setAttribute('src', `${item.getAttribute('src')}`);
        imageElement.setAttribute('alt', `${item.getAttribute('alt')}`);
        imageTitle.textContent = title.textContent;
        openPopup(imagePopup);
    });
};