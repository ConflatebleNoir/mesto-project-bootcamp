'use strict';

import { submitButtonEditForm, submitButtonAddForm, nameInput, jobInput, titleInput, urlInput } from './index.js';
import { keyHandler } from "./modal.js";
import { setSubmitButtonState } from './validate'

//Функция открытия попапов
export function openPopup(popup) {
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

    document.addEventListener('keydown', keyHandler);
};

//Функция сокрытия попапов
export function closePopup(popup) {
    popup.classList.add('overlay_hidden');
};