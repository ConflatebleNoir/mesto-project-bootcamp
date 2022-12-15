'use strict';

import '../pages/index.css';
import {
    popupEditProfile,
    nameInput,
    jobInput,
    nameProfile,
    jobProfile,
    avatarProfile,
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
    avatarForm,
    submitButtonAvatarForm,
    editFormInput,
    addFormInput,
    avatarFormInput,
    popupAvatar,
    avatarClose
} from './variables.js'
import { addCard } from './card.js';
import { closePopupByOverlayClick } from './modal.js';
import { openPopup, closePopup } from './utils.js';
import { enableValidation, setSubmitButtonState } from './validate.js';
import { renderProfileInfo, patchUserInfo, postCard, patchUserAvatar } from './api.js'

renderProfileInfo().then((element) => {
    avatarProfile.setAttribute("src", `${element["avatar"]}`);
    nameProfile.textContent = element["name"];
    jobProfile.textContent = element["about"];
    console.log(element.avatar)
});

//Функция изменения данных профиля
export function editFormSubmit(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    patchUserInfo(nameProfile, jobProfile);
    closePopup(popupEditProfile);
};

//Функция добавления карточки через модальное окно
export function addFormSubmit(evt) {
    evt.preventDefault();

    addCard(urlInput.value, titleInput.value);
    postCard(titleInput.value, urlInput.value);
    evt.target.reset();
    closePopup(popupAddCard);
};

//Функция изменения данных аватара профиля
export function avatarFormSubmit(evt) {
    evt.preventDefault();

    avatarProfile.setAttribute("src", `${avatarFormInput.value}`);
    console.log(avatarProfile.getAttribute("src"))
    patchUserAvatar(avatarProfile.getAttribute("src"));
    evt.target.reset();
    closePopup(popupAvatar);
};

editButton.addEventListener('click', () => {
    openPopup(popupEditProfile);
    //Перенесем данные из поля профиля в форму
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    setSubmitButtonState(true, submitButtonEditForm);
});

editClose.addEventListener('click', () => {
    closePopup(popupEditProfile);
});

addButton.addEventListener('click', () => {
    openPopup(popupAddCard);
    setSubmitButtonState(false, submitButtonAddForm);
});

addClose.addEventListener('click', () => {
    closePopup(popupAddCard);
});

imageClose.addEventListener('click', () => {
    closePopup(imagePopup);
});

avatarProfile.addEventListener('click', () => {
    openPopup(popupAvatar);
    setSubmitButtonState(true, submitButtonAvatarForm);
});

avatarClose.addEventListener('click', () => {
    closePopup(popupAvatar)
})

popupEditProfile.addEventListener('click', (evt) => {
    closePopupByOverlayClick(evt, popupEditProfile, editForm);
});

popupAddCard.addEventListener('click', (evt) => {
    closePopupByOverlayClick(evt, popupAddCard, addForm);
});

popupAvatar.addEventListener('click', (evt) => {
    closePopupByOverlayClick(evt, popupAvatar, avatarForm)
})

imagePopup.addEventListener('click', (evt) => {
    closePopupByOverlayClick(evt, imagePopup, imageElement);
});

editForm.addEventListener('submit', editFormSubmit);
addForm.addEventListener('submit', addFormSubmit);
avatarForm.addEventListener('submit', avatarFormSubmit);

enableValidation({
    inputListSelector: '.form__element',
    submitButtonSelector: '.form__submit',
    formListSelector: '.form',
    inputErrorClass: 'form__input_type_error',
    textErrorClass: 'form__input-error_active',
    disabledButtonClass: 'form__submit_disabled',
});