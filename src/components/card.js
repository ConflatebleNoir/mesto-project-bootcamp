'use strict';

import { cardsContainer } from "./variables.js";
import { imagePopupToggle } from "./modal.js";
import { renderGroupCards, getOwnerID, putLike, deleteLike } from "./api.js"

export function createCard(imageValue, titleValue, likeValue) {
    const cardTemplate = document.querySelector('.card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardMask = cardElement.querySelector('.card__mask');
    const likeCounter = cardElement.querySelector('.card__like-count');
    // getOwnerID().then((items) => {
    //     items.forEach((item) => {
    //         if (item["owner"]["_id"] === '5d05e97582a44e0e5de2165a') {
    //             trash.remove();
    //         }
    //     })
    // })

    cardMask.setAttribute("src", `${imageValue}`);
    cardMask.setAttribute("alt", `${titleValue}`);
    cardElement.querySelector('.card__title').textContent = titleValue;
    likeCounter.textContent = likeValue.length;

    cardElement.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('card__like')) {
            evt.target.classList.toggle('card__like_active');
            if (!evt.target.classList.contains('card__like_active')) {
                likeCounter.textContent--;
                deleteLike(evt.currentTarget, likeCounter);
            } else if (evt.target.classList.contains('card__like_active')) {
                likeCounter.textContent++;
                console.log(putLike(evt.currentTarget, likeCounter))
                putLike(evt.currentTarget, likeCounter)
            }
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
    //Поскольку изначально должно быть 0 лайков, то обозначим это
    const countLikes = document.querySelector('.card__like-count');
    countLikes.textContent = 0;

    const cardElement = createCard(imageValue, titleValue, countLikes);
    cardsContainer.prepend(cardElement);
};

renderGroupCards().then((elements) => {
    console.log(elements)
    elements.forEach((element) => {
        const cardElement = createCard(element.link, element.name, element.likes);
        const trash = cardElement.querySelector('.card__trash');
        if (element["owner"]["_id"] !== '5d05e97582a44e0e5de2165a') {
            trash.remove();
        };
        cardsContainer.append(cardElement);
    });
});