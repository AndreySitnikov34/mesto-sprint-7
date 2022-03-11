import "./../index.css";
import {
  // showInputError,
  // hideInputError,
  // checkInputValidity,
  // isValid,
  // hasInvalidInput,
  // toggleButtonState,
  // setEventListeners,
  // clearErrorMessage,
  enableValidation,
} from "../components/validate.js";

import {
  // createCard,
  addCard,
  // toggleLikes,
  // likeCard,
} from "../components/card.js";

import {
  // avatarSubmitButton,
  openAvatarPopup,
  handleAvatarPopup,
  handleSubmitProfile,
  openProfilePopup,
  handleCardFormSubmit,
  openCardPopup,
  // openImagePopup,
} from "../components/modal.js";

import {
  // formElement,
  popupFormUser,
  popupFormAvatar,
  // avatarLink,
  // formUserNameInput,
  // formUserAboutInput,
  userName,
  userAbout,
  userPic,
  // cardTemplate,
  cardFormPopup,
  // titleInputCard,
  // linkInputCard,
  // cards,
  // popupImage,
  // imageOpen,
  // signImage,
} from "../components/constants.js";

import {
  // config,
  // parseResponce,
  getCards,
  // postCard,
  // deleteCard,
  // addLike,
  // deleteLike,
  getUser,
  // updateUser,
  // updateAvatar,
} from "../components/api.js";

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
popupFormAvatar.addEventListener("submit", handleAvatarPopup);
popupFormUser.addEventListener("submit", handleSubmitProfile);
cardFormPopup.addEventListener("submit", handleCardFormSubmit);
// formElement.addEventListener("submit", handleAvatarPopup);
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
//Пробую применить Promise.all
// Promise.all([getUser(), getCards()])
//   .then(([userData, cards]) => {
//     const user = userData; // тут установка данных пользователя
//     const cards = cardsData; // и тут отрисовка карточек
//     userName.textContent = user.name;
//     userAbout.textContent = user.about;
//     userPic.src = user.avatar;
//     renderCards(cards, user);
//   })
//   .catch((err) => {
//     console.log("Ошибка загрузки данных", err); // тут ловим ошибку
//   });
