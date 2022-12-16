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
        .catch((res) => {
            console.log(`Ошибка: ${res.status}`);
        })
}


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
        .catch((res) => {
            console.log(`Ошибка: ${res.status}`);
        })
}

export const putLike = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/cohort-55/cards/likes/${cardId}`, {
        method: "PUT",
        headers: {
            authorization: "4a077796-6e98-44e5-9c13-60ffdba9f31a",
            "Content-Type": "application/json"
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

export const deleteLike = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/cohort-55/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: {
            authorization: "4a077796-6e98-44e5-9c13-60ffdba9f31a",
            "Content-Type": "application/json"
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

export const patchUserAvatar = (avatarSrcAttribute) => {
    return fetch("https://nomoreparties.co/v1/cohort-55/users/me/avatar", {
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