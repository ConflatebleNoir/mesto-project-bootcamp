// Токен: 4a077796-6e98-44e5-9c13-60ffdba9f31a
// Идентификатор группы: cohort-55

import { cardsContainer, nameProfile, jobProfile, avatarProfile } from './variables';

import { createCard } from './card.js';

//Вызов данных пользователя и их рендер
export function renderProfileInfo() {
    return fetch("https://nomoreparties.co/v1/cohort-55/users/me", {
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
        .then((element) => {
            console.log(element);
            avatarProfile.setAttribute("src", element["avatar"]);
            nameProfile.textContent = element["name"];
            jobProfile.textContent = element["about"];
        })
        .catch((res) => {
            console.log(`Ошибка: ${res.status}`);
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
//обновляем данные пользователя и получаем их
export function patchUserInfo(name, job, avatar) {
    return fetch("https://nomoreparties.co/v1/cohort-55/users/me", {
        method: "PATCH",
        headers: {
            authorization: "4a077796-6e98-44e5-9c13-60ffdba9f31a",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: `${name.textContent}`,
            about: `${job.textContent}`,
            avatar: `${avatar.getAttribute("src")}`
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(renderProfileInfo)
        .catch((res) => {
            console.log(`Ошибка: ${res.status}`);
        })
}
//отправка созданной карточки на сервер
export function postCard(name, link) {
    return fetch("https://nomoreparties.co/v1/cohort-55/cards", {
        method: "POST",
        headers: {
            authorization: "4a077796-6e98-44e5-9c13-60ffdba9f31a",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: `${name}`,
            link: `${link}`
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(renderGroupCards)
        .catch((res) => {
            console.log(`Ошибка: ${res.status}`);
        })
}