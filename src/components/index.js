import "./../index.css";
import {
  showInputError,
  hideInputError,
  checkInputValidity,
  isValid,
  hasInvalidInput,
  toggleButtonState,
  setEventListeners,
  clearErrorMessage,
  enableValidation,
} from "../components/validate.js";

// import { addCard, } from "../components/card.js";

import {
  openAvatarPopup,
  handleAvatarPopup,
  handleSubmitProfile,
  openProfilePopup,
  handleCardFormSubmit,
  openCardPopup,
  openImagePopup,
  createCard,
  addCard,
  toggleLikes,
} from "../components/modal.js";

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

import {
  openPopup,
  closePopup,
  popups,
  closePopEsc,
} from "../components/utils.js";

//Включение валидации всех форм
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".button",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input-error",
  errorClass: "form__input-error_active",
});

// function setContent() {
//   initialCards.forEach((content) => addCard(content));
// }

// setContent();

document
  .querySelector(".user__overlay")
  .addEventListener("click", openAvatarPopup);
document
  .querySelector(".card__add-button")
  .addEventListener("click", openCardPopup);
document
  .querySelector(".user__info-edit-button")
  .addEventListener("click", editUser);

popupFormAvatar.addEventListener("submit", handleAvatarPopup);
popupFormUser.addEventListener("submit", handleSubmitProfile);
cardFormPopup.addEventListener("submit", handleCardFormSubmit);
//Изъятие карточек у сервера
const renderCards = () => {
  console.log("render cards");
  getCards()
    .then((data) => {
      console.log("then");
      data.forEach((card) => {
        addCard(card);
      });
    })
    .catch((err) => {
      console.log("Ошибка загрузки контента", err.message);
    });
};
//Добавление своей карточки на сервер
export function addNewCard(newCard) {
  postCard(newCard).then((res) => {
    // console.log(res);
    const contentCard = createCard(res);
    cards.prepend(contentCard);
  });
}

renderCards();

formElement.addEventListener("submit", editUser);

//Редактирование профиля
export function editUser(evt) {
  console.log("start Edit User");
  evt.preventDefault();
  const buttonElement = cardFormPopup.querySelector(".button");
  buttonElement.textContent = "Сохранение...";
  updateUser({
    name: formUserNameInput.value,
    about: formUserAboutInput.value,
  })
    .then((res) => {
      userName.textContent = formUserNameInput.value;
      userAbout.textContent = formUserAboutInput.value;
      closePopup(popupProfile);
    })
    .catch((err) => {
      console.log("Ошибка редактирования профиля", err.message);
    })
    .finally(() => {
      buttonElement.textContent = "Сохранить";
    });
}
//Функция добавления/удаления лайка
export function likeCard() {
  let length = Number(likeCounter.textContent.value);
  if (!likeButton.classList.contains("card__heart")) {
    addLike(res._id)
      .then((res) => {
        likeButton.classList.add("card__heart");
        likeCounter.textContent = length + 1;
      })
      .catch((err) => {
        console.log("Ошибка добавления лайка", err.message);
      });
  } else {
    deleteLike(res._id)
      .then((res) => {
        likeButton.classList.remove("card__heart");
        likeCounter.textContent = length - 1;
      })
      .catch((err) => {
        console.log("Ошибка удаления лайка", err.message);
      });
  }
}
//Просто fetch запрос
// const userInfo = () => {
//   return fetch(`https://nomoreparties.co/v1/plus-cohort7/cards`, {
//     headers: {
//       authorization: "01124a9d-ad91-4991-aee6-270006a314f8",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data));
// };
// console.log(data);

//Информация о пользователе
console.log(
  fetch(`https://nomoreparties.co/v1/plus-cohort7/users/me`, {
    headers: {
      authorization: "01124a9d-ad91-4991-aee6-270006a314f8",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
);
