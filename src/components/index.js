'use strict';

import '../pages/index.css';
// подтягиваем элементы формы edit
export const popupEditProfile = document.querySelector('#profile-overlay');
export const nameInput = popupEditProfile.querySelector('#form__name');
export const jobInput = popupEditProfile.querySelector('#form__nickname');
// элементы блока profile
export const nameProfile = document.querySelector('.profile__name');
export const jobProfile = document.querySelector('.profile__nickname');
//элементы формы добавления карточки
export const popupAddCard = document.querySelector('#add-overlay');
export const titleInput = popupAddCard.querySelector('#add__image-name');
export const urlInput = popupAddCard.querySelector('#add__image-url');
//контейнер карточек
export const cardsContainer = document.querySelector('.cards');
//Добавим кнопки для открытия popup
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
//Добавим кнопки для закрытия popup
export const editClose = popupEditProfile.querySelector('.popup-wrapper__close');
export const addClose = popupAddCard.querySelector('.popup-wrapper__close');
// вытягиваем элементы попапа изображения
export const imagePopup = document.querySelector('#image-overlay');
export const imageElement = imagePopup.querySelector('.popup__image');
export const imageTitle = imagePopup.querySelector('.popup__title');
export const imageClose = imagePopup.querySelector('.popup-wrapper__close');
//Добавим формы и кнопки submit
export const editForm = document.forms.editForm;
export const submitButtonEditForm = editForm.querySelector('.form__submit');
export const addForm = document.forms.addForm;
export const submitButtonAddForm = addForm.querySelector('.form__submit');
//Элементы полей
export const editFormInput = editForm.querySelector('.form__element');
export const addFormInput = addForm.querySelector('.form__element');
const inputElement = document.querySelector('.form__element')

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
import { closePopupByOverlayClick } from './modal.js';
import { openPopup, closePopup } from './utils.js';
import { enableValidation, setSubmitButtonState } from './validate.js';

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

// Рендер карточек из массива
initialCards.forEach((element) => {
    const cardElement = createCard(element.link, element.name);
    cardsContainer.append(cardElement);
});

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