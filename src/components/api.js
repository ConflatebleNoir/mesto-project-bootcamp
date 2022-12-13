// Токен: 4a077796-6e98-44e5-9c13-60ffdba9f31a
// Идентификатор группы: cohort-55

import { cardsContainer, nameProfile, jobProfile } from './index.js'
import { createCard } from './card.js';

//Вызов данных пользователя и их рендер
export function renderProfileInfo() {
    return fetch("https://nomoreparties.co/v1/cohort-55/me", {
        headers: {
            authorization: "4a077796-6e98-44e5-9c13-60ffdba9f31a"
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((elements) => {
            elements.forEach((element) => {
                nameProfile.textContent = element["name"];
                jobProfile.textContent = element["about"];
            })
        })
}

//Вызов карточек пользователей и их рендер
export function renderGroupCards() {
    return fetch("https://nomoreparties.co/v1/cohort-55/cards", {
        headers: {
            authorization: "4a077796-6e98-44e5-9c13-60ffdba9f31a"
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((elements) => {
            console.log(elements)
            elements.forEach((element) => {
                const cardElement = createCard(element.link, element.name);
                cardsContainer.append(cardElement);
            });
        })
        .catch((res) => {
            console.log(`Ошибка: ${res.status}`);
        })

}