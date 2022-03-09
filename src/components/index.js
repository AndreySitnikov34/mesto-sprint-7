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

import {
  createCard,
  addCard,
  toggleLikes,
  likeCard,
} from "../components/card.js";

import {
  openAvatarPopup,
  handleAvatarPopup,
  handleSubmitProfile,
  openProfilePopup,
  handleCardFormSubmit,
  openCardPopup,
  openImagePopup,
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
//Слушатели кликов
document
  .querySelector(".user__overlay")
  .addEventListener("click", openAvatarPopup);
document
  .querySelector(".card__add-button")
  .addEventListener("click", openCardPopup);
document
  .querySelector(".user__info-edit-button")
  .addEventListener("click", openProfilePopup);
//Слушатели сабмитов
// popupFormAvatar.addEventListener("submit", updateUserPhoto);
popupFormUser.addEventListener("submit", handleSubmitProfile);
cardFormPopup.addEventListener("submit", handleCardFormSubmit);
formElement.addEventListener("submit", handleAvatarPopup);
//Изъятие карточек у сервера
const renderCards = (userId) => {
  // console.log("render cards");
  getCards()
    .then((data) => {
      // console.log("then");
      data.forEach((card) => {
        addCard(card, userId);
      });
    })
    .catch((err) => {
      console.log("Ошибка загрузки контента:", err.message);
    });
};
//Добавление своей карточки на сервер
export function addNewCard(newCard) {
  postCard(newCard).then((res) => {
    console.log(res);
    const contentCard = createCard(res);
    cards.prepend(contentCard);
  });
}

//Получение информации о юзере при загрузке
getUser()
  .then((data) => {
    const userId = data._id;
    console.log("Информация по юзеру", data);
    userName.textContent = data.name;
    userAbout.textContent = data.about;
    userPic.src = data.avatar;

    renderCards(userId);
  })
  .catch((err) => {
    console.log("Ошибка загрузки данных о пользователе", err);
  });

// //Смена аватарки
// export function updateUserPhoto(evt) {
//   // evt.preventDefault();
//   const buttonElement = popupFormAvatar.querySelector(".button");
//   buttonElement.textContent = "Сохранение...";
//   updateAvatar({
//     avatar: avatarLink.value,
//   })
//     .then((res) => {
//       userPic.src = avatarLink.value;
//       closePopup(popupFormAvatar);
//     })
//     .catch((err) => {
//       console.log("Ошибка смены аватара", err.message);
//     })
//     .finally(() => {
//       buttonElement.textContent = "Сохранить";
//     });
// }
//Информация о пользователе
// console.log(
//   fetch(`https://nomoreparties.co/v1/plus-cohort7/users/me`, {
//     headers: {
//       authorization: "01124a9d-ad91-4991-aee6-270006a314f8",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((data) => console.log(data))
// );
