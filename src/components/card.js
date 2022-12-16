'use strict';

import { cardsContainer } from "./variables.js";
import { imagePopupToggle } from "./modal.js";
import { renderGroupCards, removeUserCard, putLike, deleteLike } from "./api.js"

export function createCard(imageValue, titleValue, likeValue) {
    const cardTemplate = document.querySelector('.card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardMask = cardElement.querySelector('.card__mask');
    const likeCounter = cardElement.querySelector('.card__like-count');

    cardMask.setAttribute("src", `${imageValue}`);
    cardMask.setAttribute("alt", `${titleValue}`);
    cardElement.querySelector('.card__title').textContent = titleValue;
    likeCounter.textContent = likeValue.length;

    cardElement.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('card__mask')) {
            imagePopupToggle(evt.target, cardElement.querySelector('.card__title'));
        };
    });


    return cardElement;
};

//функция рендера карточки
export function addCard(imageValue, titleValue) {
    //Поскольку изначально должно быть 0 лайков, то обозначим это
    const countLikes = document.querySelector('.card__like-count');
    countLikes.textContent = '0';

    const cardElement = createCard(imageValue, titleValue, countLikes);
    cardsContainer.prepend(cardElement);
};

renderGroupCards().then((elements) => {
    console.log(elements)
    elements.forEach((element) => {
        const cardElement = createCard(element.link, element.name, element.likes);
        const trash = cardElement.querySelector('.card__trash');
        //8.1 Получение ID пользователя, посылаемый в рендер для запрета элемента удаления
        if (element["owner"]["_id"] !== '5d05e97582a44e0e5de2165a') {
            trash.remove();
        };
        //8.2 Удаление карточки
        cardElement.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('card__trash') && element["owner"]["_id"] === '5d05e97582a44e0e5de2165a') {
                evt.currentTarget.remove();
                removeUserCard((element["_id"]));
            };
        });

        const likeCounter = cardElement.querySelector('.card__like-count');
        //9. Постановка/снятие лайка (добавление данных пользователя в массив и удаление из массива лайков данных пользователя)
        cardElement.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('card__like')) {
                if (evt.target.classList.contains('card__like_active')) {
                    deleteLike(element["_id"]);
                    evt.target.classList.remove('card__like_active');
                    likeCounter.textContent--;
                } else {
                    evt.target.classList.add('card__like_active');
                    putLike(element["_id"]);
                    likeCounter.textContent++;
                }
            };
        });

        cardsContainer.append(cardElement);
    });
});