// Токен: 4a077796-6e98-44e5-9c13-60ffdba9f31a
// Идентификатор группы: cohort-55

//3. Загрузка информации о пользователе с сервера
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
        .catch((res) => {
            console.log(`Ошибка: ${res.status}`);
        })
}

// 4. Загрузка карточек с сервера
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
        .catch((res) => {
            console.log(`Ошибка: ${res.status}`);
        })
}

// 5. Редактирование профиля
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

//6. Добавление новой карточки
//отправка созданной карточки на сервер + обновляем список
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

//7. Получение ID пользователя, посылаемый в рендер для запрета элемента удаления
export const getOwnerID = () => {
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

export const putLike = (cardId, likesCounter) => {
    return fetch(`https://nomoreparties.co/v1/cohort-55/cards/likes/${cardId}`, {
        method: "PUT",
        headers: {
            authorization: "4a077796-6e98-44e5-9c13-60ffdba9f31a",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            likes: likesCounter.length++
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((items) => {
            console.log(items);
        })
        .catch((res) => {
            console.log(`Ошибка: ${res.status}`);
        })
}

export const deleteLike = (cardId, likesCounter) => {
    return fetch(`https://nomoreparties.co/v1/cohort-55/cards/likes/${cardId}`, {
        method: "PUT",
        headers: {
            authorization: "4a077796-6e98-44e5-9c13-60ffdba9f31a",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            likes: likesCounter.length--
        })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((items) => {
            console.log(items);
        })
        .catch((res) => {
            console.log(`Ошибка: ${res.status}`);
        })
}

export const patchUserAvatar = (avatarSrcAttribute) => {
    return fetch("https://nomoreparties.co/v1/cohort-55/users/me", {
        method: "PATCH",
        headers: {
            authorization: "4a077796-6e98-44e5-9c13-60ffdba9f31a",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            avatar: `${avatarSrcAttribute}`
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

export const getCardID = () => {
    return fetch("https://nomoreparties.co/v1/cohort-55/cards")
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((items) => {
            items.forEach((item) => {
                console.log(item["_id"]);
            })
        })
        .catch((res) => {
            console.log(`Ошибка: ${res.status}`);
        })
}

getCardID()