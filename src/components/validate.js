'use strict';

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

    formElement.addEventListener('reset', () => {
        // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка) и только потом вызвать `toggleButtonState`
        setTimeout(() => {
            toggleButtonState(inputList, buttonElement, data);
        }, 0); // достаточно указать 0 миллисекунд, чтобы после `reset` уже сработало действие
    });


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
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(data.disabledButtonClass);
        buttonElement.removeAttribute('disabled');
    };
};

export { showInputError, hideInputError, checkValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState };