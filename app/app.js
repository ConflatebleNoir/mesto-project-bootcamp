'use strict';

//EDIT POPUP!
//вытягиваем из документа элементы для отображения edit-popup
const editProfileButton = document.querySelector('.profile__edit-button');
const popupProfileOverlay = document.querySelector('#profile-overlay');
const editPopupClose = popupProfileOverlay.querySelector('.form__close');

//подключаем слушатель на клик
if (editProfileButton) {
    editProfileButton.addEventListener('click', () => {
        popupProfileOverlay.classList.add('overlay');
        popupProfileOverlay.classList.remove('overlay_hidden');
    });
};

if (editPopupClose) {
    editPopupClose.addEventListener('click', () => {
        popupProfileOverlay.classList.remove('overlay');
        popupProfileOverlay.classList.add('overlay_hidden');
    });
};

// Находим форму в DOM
const formElement = document.querySelector('#edit-form');
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

function addNewCard(nameValue, urlValue) {
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

const addButton = document.querySelector('.profile__add-button');
const popupAddOverlay = document.querySelector('#add-overlay');
const addForm = popupAddOverlay.querySelector('.form');
const addPopupClose = popupAddOverlay.querySelector('.form__close');

// addButton.addEventListener('click', function () {
//     const addForm = document.querySelector('#add-form');
//     const cardName = editForm.querySelector('.form__title');
//     const cardUrl = editForm.querySelector('#add__image-url');

//     addNewCard(cardName.value, cardUrl.value);
//     cardName.value = '';
//     cardUrl.value = '';
// });

if (addButton) {
    addButton.addEventListener('click', () => {
        popupAddOverlay.classList.add('overlay');
        popupAddOverlay.classList.remove('overlay_hidden');
    });
};

if (addPopupClose) {
    addPopupClose.addEventListener('click', () => {
        popupAddOverlay.classList.remove('overlay');
        popupAddOverlay.classList.add('overlay_hidden');
    })
}

function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    const cardName = addForm.querySelector('#add__image-name');
    const cardUrl = addForm.querySelector('#add__image-url');

    popupProfile.classList.add('overlay_hidden');
}