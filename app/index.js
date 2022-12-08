'use strict';
// подтягиваем элементы формы edit
const editFormElement = document.querySelector('#profile-overlay');
const nameInput = editFormElement.querySelector('#form__name');
const jobInput = editFormElement.querySelector('#form__nickname');
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
// вытягиваем элементы попапа изображения
const imagePopup = document.querySelector('#image-overlay');
const imageElement = imagePopup.querySelector('.popup__image');
const imageTitle = imagePopup.querySelector('.popup__title');
const imageClose = imagePopup.querySelector('.popup-wrapper__close');
//Добавим формы и кнопки submit
const editForm = document.forms.editForm;
const editFormSubmitButton = editForm.querySelector('.form__submit');
const addForm = document.forms.addForm;
const addFormSubmitButton = addForm.querySelector('.form__submit');
//Элементы полей
const editFormInput = editForm.querySelector('.form__element');
const addFormInput = addForm.querySelector('.form__element')

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

function createCard(imageValue, titleValue) {
    const cardTemplate = document.querySelector('.card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardMask = cardElement.querySelector('.card__mask');
    cardMask.setAttribute("src", `${imageValue}`);
    cardMask.setAttribute("alt", `${titleValue}`);
    cardElement.querySelector('.card__title').textContent = titleValue;

    cardElement.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('card__like')) {
            evt.target.classList.toggle('card__like_active');
        };
    });

    cardElement.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('card__trash')) {
            evt.currentTarget.remove();
        };
    });

    cardElement.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('card__mask')) {
            imagePopupToggle(evt.target, cardElement.querySelector('.card__title'));
        };
    });


    return cardElement;
};

//функция рендера карточки
function addCard(imageValue, titleValue) {
    const cardElement = createCard(imageValue, titleValue);
    cardsContainer.prepend(cardElement);
};

//Функция открытия попапов
function openPopup(popup) {
    popup.classList.add('overlay');
    popup.classList.remove('overlay_hidden');
};

//Функция сокрытия попапов
function closePopup(popup) {
    popup.classList.add('overlay_hidden');
};

//Функция закрытия попапов кликом/тапом на оверлей
function closePopupByOverlayClick(evt, popup, form) {
    const abroad = evt.composedPath().includes(form);
    if (!abroad) {
        popup.classList.add('overlay_hidden');
    };
};

//Функция сокрытия окна, нажатием на Escape
function keyHandler(evt, popup) {
    if (evt.key === 'Escape') {
        closePopup(popup);
    };
};

//Функция добавления карточки
function addFormSubmit(evt) {
    evt.preventDefault();

    addCard(urlInput.value, titleInput.value);
    evt.target.reset();
    closePopup(addFormElement);
};

//Функция вывода изображения карточки в виде popup
function imagePopupToggle(item, title) {
    //открываем
    item.addEventListener('click', () => {
        openPopup(imagePopup);
        imageElement.setAttribute('src', `${item.getAttribute('src')}`);
        imageElement.setAttribute('alt', `${item.getAttribute('alt')}`);
        imageTitle.textContent = title.textContent;
    });
};

//Отобразим ошбику валидации формы 
function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('.form__input-error_active');
};

//скроем
function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('.form__input-error_active');
    errorElement.textContent = '';
};

//функция проверки данных + вызов ошибки 
function checkValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    };
};

// Функция для установки слушателей на поля ввода
function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.form__element'));
    const buttonElement = formElement.querySelector('.form__submit');

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement)
        });
    });
};

function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        setEventListeners(formElement);
    });
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('form__submit_disabled');
    } else {
        buttonElement.classList.remove('form__submit_disabled');
    };
};

//Функция изменения данных профиля
function editFormSubmit(evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup(editFormElement);
};

function setSubmitButtonState(isFormValid, button) {
    if (isFormValid) {
        button.removeAttribute('disabled');
        button.classList.remove('form__submit_disabled');
    } else {
        button.setAttribute('disabled', true);
        button.classList.add('form__submit_disabled');
    };
};

// Рендер карточек из массива
initialCards.forEach((element) => {
    const cardElement = createCard(element.link, element.name);
    cardsContainer.append(cardElement);
});

editButton.addEventListener('click', () => {
    openPopup(editFormElement);
    //Перенесем данные из поля профиля в форму
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
    setSubmitButtonState(true, editFormSubmitButton);
});

editClose.addEventListener('click', (evt) => {
    closePopup(editFormElement);
});

addButton.addEventListener('click', () => {
    openPopup(addFormElement);
    setSubmitButtonState(false, addFormSubmitButton);
});

addClose.addEventListener('click', (evt) => {
    closePopup(addFormElement);
});

imageClose.addEventListener('click', () => {
    closePopup(imagePopup);
});

editFormElement.addEventListener('click', (evt) => {
    closePopupByOverlayClick(evt, editFormElement, editForm);
});

addFormElement.addEventListener('click', (evt) => {
    closePopupByOverlayClick(evt, addFormElement, addForm);
});

imagePopup.addEventListener('click', (evt) => {
    closePopupByOverlayClick(evt, imagePopup, imageElement);
});

document.addEventListener('keydown', (evt) => {
    keyHandler(evt, editFormElement);
    keyHandler(evt, addFormElement);
    keyHandler(evt, imagePopup);
    console.log('боййй');
});

editForm.addEventListener('input', () => {
    const isValidEdit = nameInput.value.length >= 2 && jobInput.value.length >= 2;
    setSubmitButtonState(isValidEdit, editFormSubmitButton);
});

addForm.addEventListener('input', () => {
    const isValidAdd = titleInput.value.length >= 2 && urlInput.value.includes('https://');
    setSubmitButtonState(isValidAdd, addFormSubmitButton);
});

editForm.addEventListener('submit', editFormSubmit);
addForm.addEventListener('submit', addFormSubmit);

enableValidation();