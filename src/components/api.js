const config = {
  url: "https://nomoreparties.co/v1/plus-cohort7",
  headers: {
    authorization: "01124a9d-ad91-4991-aee6-270006a314f8",
    "Content-Type": "application/json",
  },
};
//Парсинг ответа
const parseResponce = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};
//Вытягиваие карточек с сервера
export const getCards = () => {
  return fetch(`${config.url}/cards`, {
    headers: config.headers,
  })
    .then((res) => parseResponce(res))
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};
//Добавление своей карточки
export const postCard = () => {
  return fetch(config.url, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  })
    .then((res) => parseResponce(res))
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};
//Удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.url}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => parseResponce(res))
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};
//Добавление лайка
export const addLike = (cardId) => {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => parseResponce(res))
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};
//Удаление лайка
export const deleteLike = (cardId) => {
  return fetch(`${config.url}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => parseResponce(res))
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};
//Добавление пользователя
export const updateUser = () => {
  return fetch(`${config.url}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about,
    }),
  })
    .then((res) => parseResponce(res))
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};
//Смена аватарки
export const updateAvatar = () => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: data.avatar }),
  })
    .then((res) => parsResponse(res))
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
};
//Смена аватарки (асинхронной функцией) как подсказывает VSCode
// export const updateAvatar = async () => {
//   try {
//     const res = await fetch(`${config.url}/users/me/avatar`, {
//       method: "PATCH",
//       headers: config.headers,
//       body: JSON.stringify({ avatar: data.avatar }),
//     });
//     return parsResponse(res);
//   } catch (err) {
//     console.log(err);
//     return await Promise.reject(err);
//   }
// };
