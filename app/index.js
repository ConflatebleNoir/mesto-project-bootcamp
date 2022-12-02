'use strict';
// подтягиваем элементы формы edit
const editFormElement = document.querySelector('#profile-overlay');
const nameInput = editFormElement.querySelector('#edit-form__name');
const jobInput = editFormElement.querySelector('#edit-form__nickname');
// элементы блока profile
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__nickname');
//элементы формы добавления карточки
const addFormElement = document.querySelector('#add-overlay');
const titleInput = addFormElement.querySelector('#add__image-name');
const urlInput = addFormElement.querySelector('#add__image-url');
//контейнер карточек
const cardsContainer = document.querySelector('.cards');
//Добавим кнопки для открытия popup
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
//Добавим кнопки для закрытия popup
const editClose = editFormElement.querySelector('.popup-wrapper__close');
const addClose = addFormElement.querySelector('.popup-wrapper__close');

//Перенесем данные из поля профиля в форму
nameInput.value = nameProfile.textContent;
jobInput.value = jobProfile.textContent;

//Добавим массив свойств карточек
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

//функция рендера карточки
function addCard(imageValue, titleValue) {
    const cardTemplate = document.querySelector('.card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__mask').setAttribute("src", `${imageValue}`);
    cardElement.querySelector('.card__mask').setAttribute("alt", `${titleValue}`);
    cardElement.querySelector('.card__title').textContent = titleValue;
    cardElement.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('card__like')) {
            evt.target.classList.toggle('card__like_active');
        } else if (evt.target.classList.contains('card__trash')) {
            evt.currentTarget.remove();
        } else if (evt.target.classList.contains('card__mask')) {
            console.log(evt.target.getAttribute("src"));
            imagePopupToggle(evt.target, cardElement.classList.contains('card__title'));
        };
    });

    cardsContainer.prepend(cardElement);
};

//Функция вывода изображения карточки в виде popup
function imagePopupToggle(item, title) {
    const imagePopup = document.querySelector('#image-overlay');
    const imageElement = imagePopup.querySelector('.popup__image');
    const imageTitle = imagePopup.querySelector('.popup__title');
    const imageClose = imagePopup.querySelector('.popup-wrapper__close');

    if (item) {
        item.addEventListener('click', () => {
            imagePopup.classList.add('overlay');
            imagePopup.classList.remove('overlay_hidden');
            imageElement.setAttribute('src', `${item.getAttribute('src')}`);
            imageElement.setAttribute('alt', `${item.getAttribute('alt')}`);
            imageTitle.textContent = title.textContent;
        });
    } else if (imageClose) {
        imageClose.addEventListener('click', () => {
            imagePopup.classList.add('overlay_hidden');
        });
    };
};

//Функция открытия попапов
function popupOpener(item, form) {
    if (item) {
        item.addEventListener('click', () => {
            form.classList.add('overlay');
            form.classList.remove('overlay_hidden');
        });
    };
};

//Функция сокрытия попапов
function popupClose(item, form) {
    if (item) {
        item.addEventListener('click', () => {
            form.classList.add('overlay_hidden');
        });
    };
}

//Функция добавления карточки
function addFormSubmit(evt) {
    evt.preventDefault();

    addCard(urlInput.value, titleInput.value);
    urlInput.value = '';
    titleInput.value = '';
};

//Функция изменения данных профиля
function editFormSubmit(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
};

// Рендер карточек из массива
initialCards.forEach((element) => {
    addCard(element.link, element.name);
});

popupOpener(editButton, editFormElement);
popupOpener(addButton, addFormElement);

popupClose(editClose, editFormElement);
popupClose(addClose, addFormElement);

editFormElement.addEventListener('submit', editFormSubmit);
addFormElement.addEventListener('submit', addFormSubmit);