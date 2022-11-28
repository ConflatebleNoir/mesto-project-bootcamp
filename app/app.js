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
const editFormElement = document.querySelector('#edit-form');
//достаем тексовые элементы профиля и элементы формы
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__nickname');
const nameInput = editFormElement.querySelector('#edit-form__name');
const jobInput = editFormElement.querySelector('#edit-form__nickname');

//копируем содержимое текстовых элементов профиля в поля формы
nameInput.value = profileName.textContent;
jobInput.value = profileBio.textContent;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function editFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = nameInput.value;
    profileBio.textContent = jobInput.value;
    popupProfileOverlay.classList.add('overlay_hidden');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editFormElement.addEventListener('submit', editFormSubmit);

// 2. Создадим массив объектов данных статических карточек
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

const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content;

initialCards.forEach(function (element) {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.card__mask').setAttribute("src", `${element.link}`);
    cardElement.querySelector('.card__title').textContent = element.name;
    cardElement.querySelector('.card__like').addEventListener('click', (evt) => {
        evt.target.classList.toggle('card__like_active');
    });

    cardsContainer.prepend(cardElement);
});


// function addNewCard(nameValue, urlValue) {
//     const cardTemplate = document.querySelector('#card-template').content;
//     const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

//     cardElement.querySelector('.card__mask').setAttribute("src", `${urlValue.value}`);
//     cardElement.querySelector('.card__title').textContent = nameValue.value;
//     cardsContainer.prepend(cardElement);
// }

const addButton = document.querySelector('.profile__add-button');
const popupAddOverlay = document.querySelector('#add-overlay');
const addForm = popupAddOverlay.querySelector('.form');
const addPopupClose = popupAddOverlay.querySelector('.form__close');

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

function addFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    popupAddOverlay.classList.add('overlay_hidden');
}

addForm.addEventListener('submit', addFormSubmit);