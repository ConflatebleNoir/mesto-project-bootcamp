'use strict';

import {
    nameInput,
    jobInput,
    titleInput,
    urlInput
} from './variables.js';
import { handleEscapeKey } from "./modal.js";

//Функция открытия попапов
export function openPopup(popup) {

    document.addEventListener('keydown', handleEscapeKey);
    popup.classList.add('popup_opened');
    popup.classList.remove('popup_hidden');

    editForm.addEventListener('input', () => {
        const isValidEdit = nameInput.value.length >= 2 && jobInput.value.length >= 2;
    });

    addForm.addEventListener('input', () => {
        const isValidAdd = titleInput.value.length >= 2 && urlInput.value.includes('https://');
    });
};

//Функция сокрытия попапов
export function closePopup(popup) {
    popup.classList.add('popup_hidden');
    popup.classList.remove('popup_opened');
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