// Токен: 4a077796-6e98-44e5-9c13-60ffdba9f31a
// Идентификатор группы: cohort-55

import { cardsContainer, nameProfile, jobProfile, avatarProfile } from './variables';

import { createCard } from './card.js';

//Вызов данных пользователя и их рендер
export const renderProfileInfo = () => {
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
            avatarProfile.setAttribute("src", element["avatar"]);
            nameProfile.textContent = element["name"];
            jobProfile.textContent = element["about"];
            console.log(element.avatar)
        })
        .catch((res) => {
            console.log(`Ошибка: ${res.status}`);
        })
}

//Вызов карточек пользователей и их рендер + рендер их значения лайков
export const renderGroupCards = () => {
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
                const cardElement = createCard(element.link, element.name, element.likes);
                cardsContainer.append(cardElement);
            });
        })
        .catch((res) => {
            console.log(`Ошибка: ${res.status}`);
        })
}
//обновляем данные пользователя и получаем их
export const patchUserInfo = (name, job) => {
    return fetch("https://nomoreparties.co/v1/cohort-55/users/me", {
        method: "PATCH",
        headers: {
            authorization: "4a077796-6e98-44e5-9c13-60ffdba9f31a",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: `${name.textContent}`,
            about: `${job.textContent}`
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
export const postCard = (name, link) => {
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

export const getOwnerID = (ownerID) => {
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
        .then((items) => {
            items.forEach((item) => {
                if (item["owner"]["_id"] === '5d05e97582a44e0e5de2165a') {
                    ownerID = item["owner"]["_id"];
                }
            })
            console.log(ownerID)
            return ownerID;
        })
        .catch((res) => {
            console.log(`Ошибка: ${res.status}`);
        })
};
//удаление карточки с сервера
export const removeUserCard = (cardID) => {
    return fetch(`https://nomoreparties.co/v1/cohort-55/cards/${cardID}`, {
        method: "DELETE",
        headers: {
            authorization: "4a077796-6e98-44e5-9c13-60ffdba9f31a",
            "Content-type": "application/json"
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(res => console.log(res))
        .catch((res) => {
            console.log(`Ошибка: ${res.status}`);
        })
}

getOwnerID();

export const patchUserAvatar = (avatarItem) => {
    return fetch("https://nomoreparties.co/v1/cohort-55/users/me", {
        method: "PATCH",
        headers: {
            authorization: "4a077796-6e98-44e5-9c13-60ffdba9f31a",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            avatar: `${avatarItem.getAttribute("src")}`
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((item) => {
            avatarItem.setAttribute("src", `${item["avatar"]}`)
            console.log(avatarItem);
        })
        .catch((res) => {
            console.log(`Ошибка: ${res.status}`);
        })
}