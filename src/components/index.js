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
    editButton,
    addButton,
    editForm,
    submitButtonEditForm,
    addForm,
    submitButtonAddForm,
    avatarForm,
    submitButtonAvatarForm,
    avatarFormInput,
    popupAvatar,
} from './variables.js'
import { addCard } from './card.js';
import { openPopup, closePopup, renderLoading } from './utils.js';
import { enableValidation } from './validate.js';
import { renderProfileInfo, patchUserInfo, postCard, patchUserAvatar, renderGroupCards } from './api.js'

const popups = document.querySelectorAll('.popup');
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
export function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    renderLoading(true, submitButtonEditForm)
    patchUserInfo(nameInput, jobInput)
        .then((res) => {
            nameProfile.textContent = res.name;
            jobProfile.textContent = res.about;
            closePopup(popupEditProfile);
        })
        .catch((res) => {
            console.log(`Ошибка: ${res.status}`);
        })
        .finally(() => {
            renderLoading(false, submitButtonEditForm)
        })
};

//Функция добавления карточки через модальное окно
export function handleAddFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, submitButtonAddForm);

    postCard(titleInput.value, urlInput.value)
        .then((res) => {
            console.log(res)
            const currentUser = res.owner._id;
            const card = addCard(res, currentUser);
            evt.target.reset();
        })
        .catch((res) => {
            console.log(res);
        })
        .finally(() => {
            closePopup(popupAddCard);
            renderLoading(false, submitButtonAddForm);
        });
};

//10. Функция изменения данных аватара профиля
export function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    renderLoading(true, submitButtonAvatarForm)

    patchUserAvatar(avatarFormInput)
        .then((res) => {
            console.log(res);
            avatarProfile.setAttribute("src", `${res.avatar}`);
            evt.target.reset();
        })
        .catch((res) => {
            console.log(`Ошибка: ${res.status}`);
        })
        .finally(() => {
            closePopup(popupAvatar);
            renderLoading(false, submitButtonAvatarForm)
        })
};

editButton.addEventListener('click', () => {
    openPopup(popupEditProfile);
    //Перенесем данные из поля профиля в форму
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
});

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup-wrapper__close')) {
            closePopup(popup);
        }
    })
})

addButton.addEventListener('click', () => {
    openPopup(popupAddCard);
});

avatarProfile.addEventListener('click', () => {
    openPopup(popupAvatar);
});

editForm.addEventListener('submit', handleProfileFormSubmit);
addForm.addEventListener('submit', handleAddFormSubmit);
avatarForm.addEventListener('submit', handleAvatarFormSubmit);

enableValidation({
    inputListSelector: '.form__element',
    submitButtonSelector: '.form__submit',
    formListSelector: '.form',
    inputErrorClass: 'form__input_type_error',
    textErrorClass: 'form__input-error_active',
    disabledButtonClass: 'form__submit_disabled',
});