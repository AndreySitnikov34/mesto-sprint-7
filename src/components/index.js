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
const renderCards = () => {
  console.log("render cards");
  getCards()
    .then((data) => {
      data.forEach((card) => {
        addCard(card);
      });
    })
    .catch((err) => {
      console.log("Ошибка загрузки контента", err.message);
    });
};

export function addNewCard(newCard) {
  postCard(newCard).then((res) => {
    console.log(res);
    const contentCard = createCard(res);
    cards.prepend(contentCard);
  });
}

renderCards();
