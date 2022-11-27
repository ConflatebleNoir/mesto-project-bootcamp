'use strict';

//EDIT POPUP!
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

// Создадим массив объектов данных статических карточек
const initialCards = [
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

const addButton = document.querySelector('.profile__add-button');


function renderNewCard(nameValue, urlValue) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card');

    const cardImage = document.createElement('img');
    cardImage.classList.add('card__mask');
    cardImage.setAttribute(src, urlValue);

    const cardDescription = document.createElement('div');
    cardContainer.classList.add('card__description');

    const cardTitle = document.createElement('h2');
    cardTitle.classList.add('card__title');
    cardTitle.textContent = nameValue;

    const likeButton = document.createElement('button');
    likeButton.classList.add('card__like');
    likeButton.setAttribute(type, button);
}