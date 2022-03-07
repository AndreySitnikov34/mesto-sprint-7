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

import { addNewCard, likeCard } from "../components/index.js";

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
//Функция добавления карточки
// function addCard(evt) {
//   const cardItem = cardFormPopup.querySelector(".card").cloneNode(true);
//   const buttonElement = cardFormPopup.querySelector(".button");
//   buttonElement.textContent = "Сохранение...";
//   evt.preventDefault();
//   const likeCount = cardItem.querySelector(".card__heart-count");
//   addNewCard({
//     name: titleInputCard.value,
//     link: linkInputCard.value,
//     like: likeCount.textContent,
//   })
//     .then((card) => {
//       content.prepend(createCard(card));
//       closePopup(cardFormPopup);
//     })
//     .catch((err) => {
//       console.log("Ошибка добавления карточки на сервер", err.message);
//     })
//     .finally(function () {
//       buttonElement.textContent = "Создать";
//     });
//   buttonElement.classList.add("popup__button_disabled");
//   buttonElement.disabled = true;
// }

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

//Функция создания новой карточки
export function createCard(card) {
  // console.log(card);
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  const cardLike = cardElement.querySelector(".card__heart");
  const cardDelete = cardElement.querySelector(".card__del");
  const cardLocation = cardElement.querySelector(".card__location");
  const likeCounter = cardElement.querySelector(".card__heart-count");
  //Показать ведро только на своих карточках
  if ("9253fda4de1608ef23343856" !== card.owner._id) {
    console.log(card.owner._id);
    cardDelete.remove();
  }
  cardLocation.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  likeCounter.textContent = card.likes.length;
  cardDelete.classList.add(card._id);

  //Слушатели
  cardImage.addEventListener("click", openImagePopup);
  cardLike.addEventListener("click", likeCard);
  cardDelete.addEventListener("click", (evt) => {
    deleteCard(card._id)
      .then((card) => {
        evt.target.parentNode.remove();
      })
      .catch((err) => {
        console.log("Ошибка удаления карточки", err.message);
      });
  });
  return cardElement;
}
//Функция добавления карточки
export const addCard = (card) => {
  console.log("Содержимое карточки", card._id);
  const contentCard = createCard(card);
  cards.append(contentCard);
};

//  (evt) => {
//    removeCard(res._id)
//     .then((res) => {
//       deleteCard(evt);
//     })
//     .catch((err) => {
//       console.log("Ошибка удаления карточки", err.message);
//     })
// }

//Удаление карточки с сервера
// export function removeCard(evt) {
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
//Функция добавления/удаления лайка
export function toggleLikes(evt) {
  evt.target.classList.toggle("card__heart_liked");
}
//Работа со счетчиком лайков
// getUser()
//   .then((data) => {
//     const userId = data._id;
//     res.like.forEach((item) => {
//       if (item._id === userId) {
//         likeButton.classList.add("card__heart_liked");
//         likeCounter.textContent + 1;
//       }
//     });
//     if (res.owner._id !== userId) {
//       deleteButton.style.display = "none";
//     }
//   })
//   .catch((err) => {
//     console.log("Ошибка", err.message);
//   });
