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
import { openPopup, closePopup, renderLoading, checkResponse } from './utils.js';
import { enableValidation, setSubmitButtonState } from './validate.js';
import { renderProfileInfo, patchUserInfo, postCard, patchUserAvatar } from './api.js'

let userID = renderProfileInfo()
    .then((element) => {
        return userID = element["_id"]
    });

renderProfileInfo()
    .then((element) => {
        console.log(element)
        avatarProfile.setAttribute("src", `${element["avatar"]}`);
        nameProfile.textContent = element["name"];
        jobProfile.textContent = element["about"];
        console.log(element.avatar);
    })
    .catch((res) => {
        console.log(`Ошибка: ${res.status}`);
    });

console.log(userID);

//Функция изменения данных профиля
export function editFormSubmit(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    renderLoading(true, submitButtonEditForm)
    patchUserInfo(nameProfile, jobProfile)
        .then(renderProfileInfo)
        .catch((res) => {
            console.log(`Ошибка: ${res.status}`);
        })
        .finally(() => {
            closePopup(popupEditProfile);
            renderLoading(false, submitButtonEditForm)
        })
};

//Функция добавления карточки через модальное окно
export function addFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, submitButtonAddForm)

    addCard(urlInput.value, titleInput.value);
    postCard(titleInput.value, urlInput.value)
        .catch((res) => {
            console.log(`Ошибка: ${res.status}`);
        })
        .finally(() => {
            closePopup(popupAddCard);
            renderLoading(false, submitButtonAddForm)
        })
    evt.target.reset();
};

//10. Функция изменения данных аватара профиля
export function avatarFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, submitButtonAvatarForm)

    avatarProfile.setAttribute("src", `${avatarFormInput.value}`);
    console.log(avatarProfile.getAttribute("src"))
    patchUserAvatar(avatarProfile.getAttribute("src"))
        .then(renderProfileInfo)
        .catch((res) => {
            console.log(`Ошибка: ${res.status}`);
        })
        .finally(() => {
            closePopup(popupAvatar);
        })
    renderLoading(false, submitButtonAddForm)
    evt.target.reset();
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