'use strict';

import { submitButtonEditForm, submitButtonAddForm, nameInput, jobInput, titleInput, urlInput } from './index.js';

//Отобразим ошбику валидации формы 
function showInputError(formElement, inputElement, errorMessage, data) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(data.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(data.textErrorClass);
};

//скроем
function hideInputError(formElement, inputElement, data) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(data.inputErrorClass);
    errorElement.classList.remove(data.textErrorClass);
    errorElement.textContent = '';
};

//функция проверки данных + вызов ошибки 
function checkValidity(formElement, inputElement, data) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, data);
    } else {
        hideInputError(formElement, inputElement, data);
    };
};

// Функция для установки слушателей на поля ввода
function setEventListeners(formElement, data) {
    const inputList = Array.from(formElement.querySelectorAll(data.inputListSelector));
    const buttonElement = formElement.querySelector(data.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, data);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkValidity(formElement, inputElement, data);
            toggleButtonState(inputList, buttonElement, data)
        });
    });
};

function enableValidation(data) {
    const formList = Array.from(document.querySelectorAll(data.formListSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement, data);
    });
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

function toggleButtonState(inputList, buttonElement, data) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(data.disabledButtonClass);
    } else {
        buttonElement.classList.remove(data.disabledButtonClass);
    };
};

function setSubmitButtonState(isFormValid, button) {
    if (isFormValid) {
        button.removeAttribute('disabled');
        button.classList.remove(enableValidation.disabledButtonClass);
    } else {
        button.setAttribute('disabled', true);
        button.classList.add(enableValidation.disabledButtonClass);
    };
};

editForm.addEventListener('input', () => {
    const isValidEdit = nameInput.value.length >= 2 && jobInput.value.length >= 2;
    setSubmitButtonState(isValidEdit, submitButtonEditForm);
});

addForm.addEventListener('input', () => {
    const isValidAdd = titleInput.value.length >= 2 && urlInput.value.includes('https://');
    setSubmitButtonState(isValidAdd, submitButtonAddForm);
});

export { showInputError, hideInputError, checkValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState, setSubmitButtonState };