import {
  formElement,
  popupFormUser,
  popupFormAvatar,
  avatarLink,
  formUserNameInput,
  formUserAboutInput,
  userName,
  userAbout,
  userPic,
  cardTemplate,
  cardFormPopup,
  titleInputCard,
  linkInputCard,
  cards,
  popupImage,
  imageOpen,
  signImage,
} from "../components/constants.js";

import {
  openAvatarPopup,
  handleAvatarPopup,
  handleSubmitProfile,
  openProfilePopup,
  handleCardFormSubmit,
  openCardPopup,
  openImagePopup,
} from "../components/modal.js";

import { addNewCard } from "../components/index.js";

import {
  config,
  parseResponce,
  getCards,
  postCard,
  deleteCard,
  addLike,
  deleteLike,
  getUser,
  updateUser,
  updateAvatar,
} from "../components/api.js";

//Функция создания новой карточки
export function createCard(card) {
  console.log("48", card);
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  const cardLike = cardElement.querySelector(".card__heart");
  const cardDelete = cardElement.querySelector(".card__del");
  const cardLocation = cardElement.querySelector(".card__location");
  const likeCounter = cardElement.querySelector(".card__heart-count");
  //Показать ведро только на своих карточках
  if ("9253fda4de1608ef23343856" !== card.owner._id) {
    // console.log(card.owner._id);
    cardDelete.remove();
  }
  cardLocation.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  likeCounter.textContent = card.likes.length;
  // cardDelete.classList.add(card._id);
  //Проверка своих лайков при загрузке
  getUser()
    .then((res) => {
      const userId = res._id;
      // console.log(userId);
      // console.log("70", res);
      // res.likes.forEach((item) => {
      //   console.log(item.likes._id);
      //   if (item._id === userId) {
      //     console.log(likes._id);
      //     cardLike.classList.add("card__heart_liked");
      //   }
      // });
      // if (res.owner._id !== userId) {
      //   console.log(likes.owner._id);
      //   cardLike.classList.remove("card__heart_liked");
      // }
    })
    .catch((err) => {
      console.log("Ошибка проверки лайка", err.message);
    });
  //Функция добавления/удаления лайка
  function likeCard() {
    let length = Number(likeCounter.textContent);
    if (!cardLike.classList.contains("card__heart_liked")) {
      addLike(card._id)
        .then((card) => {
          console.log(card._id);
          cardLike.classList.add("card__heart_liked");
          likeCounter.textContent = length + 1;
        })
        .catch((err) => {
          console.log("Ошибка добавления лайка", err.message);
        });
    } else {
      deleteLike(card._id)
        .then((card) => {
          cardLike.classList.remove("card__heart_liked");
          likeCounter.textContent = length - 1;
        })
        .catch((err) => {
          console.log("Ошибка удаления лайка", err.message);
        });
    }
  }
  //Слушатели внутри функции
  cardImage.addEventListener("click", openImagePopup);
  cardLike.addEventListener("click", likeCard);
  cardDelete.addEventListener("click", (evt) => {
    deleteCard(card._id) //Удаление карточки по id
      .then((card) => {
        evt.target.closest(".card").remove();
      })
      .catch((err) => {
        console.log("Ошибка удаления карточки", err.message);
      });
  });
  return cardElement;
}
//Функция добавления карточки на сервер
export const addCard = (card) => {
  // console.log("Содержимое карточки", card._id);
  const contentCard = createCard(card);
  cards.append(contentCard);
};

//Функция удаления карточки
// removeCard(evt) {
//   console.log("Удаление карточки", evt);
//   evt.target.closest(".card").remove();
// }
//Удаление карточки с сервера
// function removeCard(evt) {
//   const cardId = evt.target.className.split(" ")[1];
//   evt.target.parentNode.remove();
//   console.log("Содержимое карточки", cardId);
//   deleteCard(cardId)
//     .then((res) => {
//       deleteCard(evt);
//     })
//     .catch((err) => {
//       console.log("Ошибка удаления карточки", err.message);
//     });
// }
