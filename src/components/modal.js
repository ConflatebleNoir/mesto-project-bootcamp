'use strict';

import {
    nameProfile,
    jobProfile,
    nameInput,
    jobInput,
    editFormElement,
    urlInput,
    titleInput,
    addFormElement,
    imagePopup,
    imageElement,
    imageTitle,
} from './index.js';
import { createCard, addCard } from './card.js';
import { openPopup, closePopup } from './utils.js';

//Функция закрытия попапов кликом/тапом на оверлей
export function closePopupByOverlayClick(evt, popup, form) {
    const abroad = evt.composedPath().includes(form);
    if (!abroad) {
        popup.classList.add('overlay_hidden');
    };
};

//Функция сокрытия окна, нажатием на Escape
export function keyHandler(evt, popup) {
    if (evt.key === 'Escape') {
        closePopup(popup);
    };
};

//Функция добавления карточки через модальное окно
export function addFormSubmit(evt) {
    evt.preventDefault();

    addCard(urlInput.value, titleInput.value);
    evt.target.reset();
    closePopup(addFormElement);
};

//Функция вывода изображения карточки в виде popup
export function imagePopupToggle(item, title) {
    //открываем
    item.addEventListener('click', () => {
        openPopup(imagePopup);
        imageElement.setAttribute('src', `${item.getAttribute('src')}`);
        imageElement.setAttribute('alt', `${item.getAttribute('alt')}`);
        imageTitle.textContent = title.textContent;
    });
};

//Функция изменения данных профиля
export function editFormSubmit(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(editFormElement);
};