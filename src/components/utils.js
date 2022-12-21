'use strict';

import { handleEscapeKey } from "./modal.js";

//Функция открытия попапов
export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscapeKey);
};

//Функция сокрытия попапов
export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscapeKey);
};

export function renderLoading(isLoading, button) {
    if (isLoading) {
        button.textContent = "Сохранить...";
    } else {
        button.textContent = "Сохранить";;
    }
}

//Проверка ответа
export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};