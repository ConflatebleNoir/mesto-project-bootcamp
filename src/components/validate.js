'use strict';

import { submitButtonEditForm, submitButtonAddForm, nameInput, jobInput, titleInput, urlInput } from './index.js';

//Отобразим ошбику валидации формы 
function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

//скроем
function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

//функция проверки данных + вызов ошибки 
function checkValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    };
};

// Функция для установки слушателей на поля ввода
function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.form__element'));
    const buttonElement = formElement.querySelector('.form__submit');

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement)
        });
    });
};

function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement);
    });
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('form__submit_disabled');
    } else {
        buttonElement.classList.remove('form__submit_disabled');
    };
};

function setSubmitButtonState(isFormValid, button) {
    if (isFormValid) {
        button.removeAttribute('disabled');
        button.classList.remove('form__submit_disabled');
    } else {
        button.setAttribute('disabled', true);
        button.classList.add('form__submit_disabled');
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