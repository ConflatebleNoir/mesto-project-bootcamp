'use strict';

import { checkResponse } from "./utils.js";

const config = {
    baseUrl: "https://nomoreparties.co/v1/cohort-55",
    headers: {
        authorization: "4a077796-6e98-44e5-9c13-60ffdba9f31a",
        "Content-Type": "application/json"
    }
}

//3. Загрузка информации о пользователе с сервера
//Вызов данных пользователя и их рендер
export function renderProfileInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    }).then(checkResponse)
}

// 4. Загрузка карточек с сервера
//Вызов карточек пользователей и их рендер + рендер их значения лайков
export function renderGroupCards() {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    }).then(checkResponse)
}

// 5. Редактирование профиля
//обновляем данные пользователя и получаем их
export const patchUserInfo = (name, job) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: `${name.value}`,
            about: `${job.value}`
        })
    }).then(checkResponse)
}

//6. Добавление новой карточки
//отправка созданной карточки на сервер
export const postCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name: `${name}`,
            link: `${link}`
        })
    }).then(checkResponse)
}

//удаление карточки с сервера
export const removeUserCard = (cardID) => {
    return fetch(`${config.baseUrl}/cards/${cardID}`, {
        method: "DELETE",
        headers: config.headers
    }).then(checkResponse)
}
//добавление инфо о лайке на сервер
export const putLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: config.headers
    }).then(checkResponse)
}
//удаление инфо о лайке на сервер
export const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: config.headers
    }).then(checkResponse)
}
//обновление инфо автара пользователя
export const patchUserAvatar = (inputAvatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: `${inputAvatar.value}`
        })
    }).then(checkResponse)
}