'use strict';

//Функция открытия попапов
export function openPopup(popup) {
    popup.classList.add('overlay');
    popup.classList.remove('overlay_hidden');
};

//Функция сокрытия попапов
export function closePopup(popup) {
    popup.classList.add('overlay_hidden');
};

