'use strict';

// подтягиваем элементы формы edit
const popupEditProfile = document.querySelector('#profile-overlay');
const nameInput = popupEditProfile.querySelector('#form__name');
const jobInput = popupEditProfile.querySelector('#form__nickname');
// элементы блока profile
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__nickname');
//элементы формы добавления карточки
const popupAddCard = document.querySelector('#add-overlay');
const titleInput = popupAddCard.querySelector('#add__image-name');
const urlInput = popupAddCard.querySelector('#add__image-url');
//контейнер карточек
const cardsContainer = document.querySelector('.cards');
//Добавим кнопки для открытия popup
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
//Добавим кнопки для закрытия popup
const editClose = popupEditProfile.querySelector('.popup-wrapper__close');
const addClose = popupAddCard.querySelector('.popup-wrapper__close');
// вытягиваем элементы попапа изображения
const imagePopup = document.querySelector('#image-overlay');
const imageElement = imagePopup.querySelector('.popup__image');
const imageTitle = imagePopup.querySelector('.popup__title');
const imageClose = imagePopup.querySelector('.popup-wrapper__close');
//Добавим формы и кнопки submit
const editForm = document.forms.editForm;
const submitButtonEditForm = editForm.querySelector('.form__submit');
const addForm = document.forms.addForm;
const submitButtonAddForm = addForm.querySelector('.form__submit');
//Элементы полей
const editFormInput = editForm.querySelector('.form__element');
const addFormInput = addForm.querySelector('.form__element');

export {
    popupEditProfile,
    nameInput,
    jobInput,
    nameProfile,
    jobProfile,
    popupAddCard,
    titleInput,
    urlInput,
    cardsContainer,
    editButton,
    addButton,
    editClose,
    addClose,
    imagePopup,
    imageElement,
    imageTitle,
    imageClose,
    editForm,
    submitButtonEditForm,
    addForm,
    submitButtonAddForm,
    editFormInput,
    addFormInput
}