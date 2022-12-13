'use strict';

import { cardsContainer } from "./variables.js";
import { imagePopupToggle } from "./modal.js";

export function createCard(imageValue, titleValue) {
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
export function addCard(imageValue, titleValue) {
    const cardElement = createCard(imageValue, titleValue);
    cardsContainer.prepend(cardElement);
};