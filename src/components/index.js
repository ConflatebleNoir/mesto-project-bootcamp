'use strict';

import '../pages/index.css';
// подтягиваем элементы формы edit
export const editFormElement = document.querySelector('#profile-overlay');
export const nameInput = editFormElement.querySelector('#form__name');
export const jobInput = editFormElement.querySelector('#form__nickname');
// элементы блока profile
export const nameProfile = document.querySelector('.profile__name');
export const jobProfile = document.querySelector('.profile__nickname');
//элементы формы добавления карточки
export const addFormElement = document.querySelector('#add-overlay');
export const titleInput = addFormElement.querySelector('#add__image-name');
export const urlInput = addFormElement.querySelector('#add__image-url');
//контейнер карточек
export const cardsContainer = document.querySelector('.cards');
//Добавим кнопки для открытия popup
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
//Добавим кнопки для закрытия popup
export const editClose = editFormElement.querySelector('.popup-wrapper__close');
export const addClose = addFormElement.querySelector('.popup-wrapper__close');
// вытягиваем элементы попапа изображения
export const imagePopup = document.querySelector('#image-overlay');
export const imageElement = imagePopup.querySelector('.popup__image');
export const imageTitle = imagePopup.querySelector('.popup__title');
export const imageClose = imagePopup.querySelector('.popup-wrapper__close');
//Добавим формы и кнопки submit
export const editForm = document.forms.editForm;
export const editFormSubmitButton = editForm.querySelector('.form__submit');
export const addForm = document.forms.addForm;
export const addFormSubmitButton = addForm.querySelector('.form__submit');
//Элементы полей
export const editFormInput = editForm.querySelector('.form__element');
export const addFormInput = addForm.querySelector('.form__element')

//Добавим массив свойств карточек
export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

import { createCard, addCard } from './card.js';
import { closePopupByOverlayClick, keyHandler, addFormSubmit, editFormSubmit } from './modal.js';
import { openPopup, closePopup } from './utils.js';
import { showInputError, hideInputError, checkValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState, setSubmitButtonState } from './validate.js';

// Рендер карточек из массива
initialCards.forEach((element) => {
    const cardElement = createCard(element.link, element.name);
    cardsContainer.append(cardElement);
});

editButton.addEventListener('click', () => {
    openPopup(editFormElement);
    //Перенесем данные из поля профиля в форму
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    setSubmitButtonState(true, editFormSubmitButton);
});

editClose.addEventListener('click', (evt) => {
    closePopup(editFormElement);
});

addButton.addEventListener('click', () => {
    openPopup(addFormElement);
    setSubmitButtonState(false, addFormSubmitButton);
});

addClose.addEventListener('click', (evt) => {
    closePopup(addFormElement);
});

imageClose.addEventListener('click', () => {
    closePopup(imagePopup);
});

editFormElement.addEventListener('click', (evt) => {
    closePopupByOverlayClick(evt, editFormElement, editForm);
});

addFormElement.addEventListener('click', (evt) => {
    closePopupByOverlayClick(evt, addFormElement, addForm);
});

imagePopup.addEventListener('click', (evt) => {
    closePopupByOverlayClick(evt, imagePopup, imageElement);
});

document.addEventListener('keydown', (evt) => {
    keyHandler(evt, editFormElement);
    keyHandler(evt, addFormElement);
    keyHandler(evt, imagePopup);
});

editForm.addEventListener('input', () => {
    const isValidEdit = nameInput.value.length >= 2 && jobInput.value.length >= 2;
    setSubmitButtonState(isValidEdit, editFormSubmitButton);
});

addForm.addEventListener('input', () => {
    const isValidAdd = titleInput.value.length >= 2 && urlInput.value.includes('https://');
    setSubmitButtonState(isValidAdd, addFormSubmitButton);
});

editForm.addEventListener('submit', editFormSubmit);
addForm.addEventListener('submit', addFormSubmit);

enableValidation();