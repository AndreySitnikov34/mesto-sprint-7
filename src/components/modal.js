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
  // evt.preventDefault(); // Не открывать в новом окне
  userPic.src = avatarLink.value; // Заменить значение src
  closePopup(popupFormAvatar);
}

//Функция обработки профиля юзера после submit
function handleSubmitProfile(evt) {
  // evt.preventDefault(); // Не открывать в новом окне
  userName.textContent = formUserNameInput.value; // Присвоить name значение из формы
  userAbout.textContent = formUserAboutInput.value; // Присвоить about значение из формы
  closePopup(popupFormUser); // Закрыть попап
}

function openProfilePopup() {
  openPopup(popupFormUser);
}

// Функция обработки создания новой карточки
function handleCardFormSubmit(evt) {
  // evt.preventDefault();
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

//Функция создания новой карточки
function createCard(card, _id) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  const cardLike = cardElement.querySelector(".card__heart");
  const cardDelete = cardElement.querySelector(".card__del");
  const cardLocation = cardElement.querySelector(".card__location");
  //Показать ведро только на своих карточках
  if ("9253fda4de1608ef23343856" !== card.owner._id) {
    console.log(card.owner._id);
    cardDelete.remove();
  }

  cardLocation.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardImage.addEventListener("click", openImagePopup);
  cardLike.addEventListener("click", likeCard);
  cardDelete.addEventListener("click", removeCard);
  return cardElement;
}
//Функция добавления карточки
const addCard = (card) => {
  console.log("Содержимое карточки", card);
  const contentCard = createCard(card);
  cards.append(contentCard);
};

//Функция удаления карточки
// removeCard(evt) {
//   console.log("Удаление карточки", evt);
//   evt.target.closest(".card").remove();
// }

//Удаление карточки с сервера
function removeCard(card) {
  console.log("Содержимое карточки", card);
  deleteCard(card)
    .then((res) => {
      deleteCard(evt);
    })
    .catch((err) => {
      console.log("Ошибка удаления карточки", err.message);
    });
}

//Или написать функцию прямо внутри, сразу после слушателя. Кажется, так красивее
// function createCard(card) {
//   const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
//   cardElement.querySelector(".card__location").textContent = card.name;
//   cardElement.querySelector(".card__img").src = card.link;
//   cardElement.querySelector(".card__img").alt = card.name;
//   cardElement
//     .querySelector(".card__img")
//     .addEventListener("click", openImagePopup);
//   cardElement
//     .querySelector(".card__heart")
//     .addEventListener("click", toggleLikes);
//   cardElement.querySelector(".card__del").addEventListener("click", () => {
//     cardElement.remove();
//   });
//   return cardElement;
// }

//Функция добавления/удаления лайка
function toggleLikes(evt) {
  evt.target.classList.toggle("card__heart_liked");
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
  createCard,
  addCard,
  toggleLikes,
};
