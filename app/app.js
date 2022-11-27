'use strict';

//вытягиваем из документа элементы для отображения edit-popup
const profileCorrection = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.overlay_hidden');
const popupClose = document.querySelector('.edit-form__close');

//подключаем слушатель на клик
if (profileCorrection) {
    profileCorrection.addEventListener('click', function () {
        popupProfile.classList.add('overlay');
        popupProfile.classList.remove('overlay_hidden');
    });
};

if (popupClose) {
    popupClose.addEventListener('click', function () {
        popupProfile.classList.remove('overlay');
        popupProfile.classList.add('overlay_hidden');
    });
};

// Находим форму в DOM
const formElement = document.querySelector('.edit-form__wrapper');
//достаем тексовые элементы профиля и элементы формы
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__nickname');
const nameInput = formElement.querySelector('#edit-form__name');
const jobInput = formElement.querySelector('#edit-form__nickname');

//копируем содержимое текстовых элементов профиля в поля формы
nameInput.value = profileName.textContent;
jobInput.value = profileBio.textContent;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileBio.textContent = jobInput.value;
    popupProfile.classList.add('overlay_hidden');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);