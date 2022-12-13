'use strict';

import '../pages/index.css';
import {
    popupEditProfile,
    nameInput,
    jobInput,
    popupAddCard,
    titleInput,
    urlInput,
    editButton,
    addButton,
    editClose,
    addClose,
    imagePopup,
    imageElement,
    imageClose,
    editForm,
    submitButtonEditForm,
    addForm,
    submitButtonAddForm
} from './variables.js'
import { addCard } from './card.js';
import { closePopupByOverlayClick } from './modal.js';
import { openPopup, closePopup } from './utils.js';
import { enableValidation, setSubmitButtonState } from './validate.js';
import { renderGroupCards, renderProfileInfo } from './api.js'

renderProfileInfo();
renderGroupCards();

//Функция добавления карточки через модальное окно
export function addFormSubmit(evt) {
    evt.preventDefault();

    addCard(urlInput.value, titleInput.value);
    evt.target.reset();
    closePopup(popupAddCard);
};

//Функция изменения данных профиля
export function editFormSubmit(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(popupEditProfile);
};

editButton.addEventListener('click', () => {
    openPopup(popupEditProfile);
    //Перенесем данные из поля профиля в форму
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    setSubmitButtonState(true, submitButtonEditForm);
});

editClose.addEventListener('click', (evt) => {
    closePopup(popupEditProfile);
});

addButton.addEventListener('click', () => {
    openPopup(popupAddCard);
    setSubmitButtonState(false, submitButtonAddForm);
});

addClose.addEventListener('click', (evt) => {
    closePopup(popupAddCard);
});

imageClose.addEventListener('click', () => {
    closePopup(imagePopup);
});

popupEditProfile.addEventListener('click', (evt) => {
    closePopupByOverlayClick(evt, popupEditProfile, editForm);
});

popupAddCard.addEventListener('click', (evt) => {
    closePopupByOverlayClick(evt, popupAddCard, addForm);
});

imagePopup.addEventListener('click', (evt) => {
    closePopupByOverlayClick(evt, imagePopup, imageElement);
});

editForm.addEventListener('submit', editFormSubmit);
addForm.addEventListener('submit', addFormSubmit);

enableValidation({
    inputListSelector: '.form__element',
    submitButtonSelector: '.form__submit',
    formListSelector: '.form',
    inputErrorClass: 'form__input_type_error',
    textErrorClass: 'form__input-error_active',
    disabledButtonClass: 'form__submit_disabled',
});