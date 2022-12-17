'use strict';

import {
    submitButtonEditForm,
    submitButtonAddForm,
    nameInput,
    jobInput,
    titleInput,
    urlInput
} from './variables.js';
import { keyHandler } from "./modal.js";
import { setSubmitButtonState } from './validate'

//Функция открытия попапов
export function openPopup(popup) {

    document.addEventListener('keydown', keyHandler);
    popup.classList.add('overlay');
    popup.classList.remove('overlay_hidden');

    editForm.addEventListener('input', () => {
        const isValidEdit = nameInput.value.length >= 2 && jobInput.value.length >= 2;
        setSubmitButtonState(isValidEdit, submitButtonEditForm);
    });

    addForm.addEventListener('input', () => {
        const isValidAdd = titleInput.value.length >= 2 && urlInput.value.includes('https://');
        setSubmitButtonState(isValidAdd, submitButtonAddForm);
    });
};

//Функция сокрытия попапов
export function closePopup(popup) {
    popup.classList.add('overlay_hidden');
    popup.classList.remove('overlay');
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