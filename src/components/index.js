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

// import { initialCards } from "../components/card.js";

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
  removeCard,
  toggleLikes,
} from "../components/modal.js";

import {
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
  .addEventListener("click", openProfilePopup);

popupFormAvatar.addEventListener("submit", handleAvatarPopup);
popupFormUser.addEventListener("submit", handleSubmitProfile);
cardFormPopup.addEventListener("submit", handleCardFormSubmit);
//Изъятие карточек у сервера
getCards()
  .then((data) => {
    console.log("then");
    const newCard = data.map((cards) => {
      return createCard(cards);
    });
    cardTemplate.prepend(...newCard);
    console.log("setContent");
  })
  .catch((err) => {
    console.log("Ошибка загрузки контента", err.message);
  });
console.log("final");
