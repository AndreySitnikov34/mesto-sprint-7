const cardInputs = Array.from(cardFormPopup.querySelectorAll("input"));
const avatarSubmitButton = popupFormAvatar.querySelector(".button-avatar");
const cardSubmitButton = cardFormPopup.querySelector(".form__submit");

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

import { hasInvalidInput, toggleButtonState } from "../components/validate.js";

import {
  openPopup,
  closePopup,
  popups,
  closePopEsc,
} from "../components/utils.js";

import {
  addLike,
  deleteCard,
  deleteLike,
  getCards,
  postCard,
  updateAvatar,
  updateUser,
} from "../components/api.js";

import { addNewCard, likeCard } from "../components/index.js";

function openAvatarPopup() {
  avatarLink.value = ""; //Сбросить значения input
  openPopup(popupFormAvatar);
  toggleButtonState(cardInputs, avatarSubmitButton, "form__submit_inactive");
}

// Функция обработки смены аватара
function handleAvatarPopup(evt) {
  console.log("start handleAvatarPopup");
  evt.preventDefault(); // Не открывать в новом окне
  const buttonElement = popupFormAvatar.querySelector(".button"); //Сделать кнопку переменной
  buttonElement.textContent = "Сохранение..."; //Поменять значение в кнопке
  userPic.src = avatarLink.value; //Заменить значение src (взять из инпута)
  updateAvatar({
    avatar: avatarLink.value,
  })
    .then((res) => {
      console.log("Аватар изменён", res);
      userPic.src = avatarLink.value; //Заменить значение src (взять из инпута)
    })
    .catch((err) => {
      console.log("Ошибка смены аватара", err.message);
    })
    .finally(() => {
      buttonElement.textContent = "Сохранить"; //Поменять значение в кнопке обратно
    });
  closePopup(popupFormAvatar);
}

//Функция обработки профиля юзера после submit
function handleSubmitProfile(evt) {
  console.log("start handleSubmitProfile");
  evt.preventDefault();
  const buttonElement = cardFormPopup.querySelector(".button");
  buttonElement.textContent = "Сохранение...";
  updateUser({
    name: formUserNameInput.value,
    about: formUserAboutInput.value,
  })
    .then((res) => {
      userName.textContent = formUserNameInput.value; // Присвоить name значение из формы
      userAbout.textContent = formUserAboutInput.value; // Присвоить about значение из формы
      closePopup(popupFormUser); // Закрыть попап
    })
    .catch((err) => {
      console.log("Ошибка редактирования профиля", err.message);
    })
    .finally(() => {
      buttonElement.textContent = "Сохранить";
    });
}

function openProfilePopup() {
  openPopup(popupFormUser);
}

// Функция обработки создания новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  addNewCard({
    name: titleInputCard.value,
    link: linkInputCard.value,
  });
  evt.target.reset();
  closePopup(cardFormPopup);
  toggleButtonState(cardInputs, cardSubmitButton, "form__submit_inactive");
}

function openCardPopup() {
  openPopup(cardFormPopup);
}

// Функция открытия картинки из карточки
function openImagePopup(evt) {
  imageOpen.src = "";
  imageOpen.src = evt.target.src;
  imageOpen.alt = evt.target.alt;
  signImage.textContent = evt.target.alt;
  openPopup(popupImage);
}

//Всё можно экспортнуть скопом (легче будет копировать в импорт;))))
export {
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
  openAvatarPopup,
  handleAvatarPopup,
  handleSubmitProfile,
  openProfilePopup,
  handleCardFormSubmit,
  openCardPopup,
  openImagePopup,
};
