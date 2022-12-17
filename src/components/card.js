'use strict';

import { cardsContainer } from "./variables.js";
import { imagePopupToggle } from "./modal.js";
import { removeUserCard, putLike, deleteLike } from "./api.js"

function setLikes(evt, cardID, element) {
    const cardElement = element;
    const likesCount = cardElement.querySelector('.card__like-count');

    if (evt.target.classList.contains('card__like') && evt.target.classList.contains('card__like_active')) {
        evt.target.classList.remove('card__like_active');
        deleteLike(cardID)
            .catch(res => { console.log(res) });
        likesCount.textContent--;
    } else {
        evt.target.classList.add('card__like_active');
        putLike(cardID)
            .catch(res => { console.log(res) });
        likesCount.textContent++;
    }
}

function removeCard(evt, cardID) {
    if (evt.target.classList.contains('card__trash')) {
        removeUserCard(cardID)
            .catch(res => { console.log(res) });
        evt.currentTarget.remove()
    };
}

//функция добавления карточки
export function addCard(element, user) {
    const cardElement = createCard(element, user);
    cardsContainer.prepend(cardElement);
};

// создание + рендер карточки
function createCard(element, user) {
    const currentCard = element;
    const userID = user;

    const currentCardOwner = currentCard.owner;
    const currentCardOwnerID = currentCardOwner._id;

    const cardName = currentCard.name;
    const imageCardSrc = currentCard.link;
    const cardID = currentCard._id;
    const arrayLikes = currentCard.likes;
    const likeValue = arrayLikes.length;

    const cardTemplate = document.querySelector('.card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardMask = cardElement.querySelector('.card__mask');
    const cardLike = cardElement.querySelector('.card__like');
    const cardTrash = cardElement.querySelector('.card__trash');

    cardMask.setAttribute("src", imageCardSrc);
    cardMask.setAttribute("alt", cardName);
    cardElement.querySelector('.card__title').textContent = cardName;
    cardElement.querySelector('.card__like-count').textContent = likeValue;

    arrayLikes.forEach((element) => {
        const userLike = element;
        const userLikeID = element._id;

        if (userID === userLikeID) {
            cardLike.classList.add('card__like_active');
        } else {
            cardLike.classList.remove('card__like_active');
        };
    });

    cardLike.addEventListener('click', (evt) => {
        setLikes(evt, cardID, cardElement);
    });

    if (userID === currentCardOwnerID) {
        cardElement.addEventListener('click', (evt) => {
            removeCard(evt, cardID);
        });
    } else {
        cardTrash.remove();
    };

    cardMask.addEventListener('click', (evt) => {
        imagePopupToggle(evt.target, cardElement.querySelector('.card__title'));
    })

    return cardElement;
};