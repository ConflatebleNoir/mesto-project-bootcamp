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
import { openPopup, closePopup, renderLoading } from './utils.js';
import { enableValidation, setSubmitButtonState } from './validate.js';
import { renderProfileInfo, patchUserInfo, postCard, patchUserAvatar, renderGroupCards } from './api.js'

const userInfo = renderProfileInfo();
const cardsInfo = renderGroupCards();

Promise.all([userInfo, cardsInfo])
    .then((array) => {
        const currentUser = array[0];
        // const myProfile = currentUser;
        const userAvatar = currentUser.avatar; // Получаем ссылку картинки аватара
        const userName = currentUser.name; // Получаем name
        const userJob = currentUser.about; // Получаем about
        const userID = currentUser._id; // Получаем id пользователя
        avatarProfile.setAttribute("src", userAvatar); // Устанавливаем полученное значение в элемент аватара
        nameProfile.textContent = userName;
        jobProfile.textContent = userJob;

        const initialCards = array[1];
        initialCards.forEach((element) => {
            const currentCard = element;
            const card = addCard(currentCard, userID);
        });
    })
    .catch((res) => {
        console.log(res);
    });

//Функция изменения данных профиля
export function editFormSubmit(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    renderLoading(true, submitButtonEditForm)
    patchUserInfo(nameProfile, jobProfile)
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
    renderLoading(true, submitButtonAddForm);

    postCard(titleInput.value, urlInput.value)
        .then((res) => {
            const currentUser = res._id;
            const card = addCard(res, currentUser);
        })
        .catch((res) => {
            console.log(res);
        })
        .finally(() => {
            closePopup(popupAddCard);
            renderLoading(false, submitButtonAddForm);
        });
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