const cardInputs = Array.from(cardFormPopup.querySelectorAll("input"));
const avatarSubmitButton = popupFormAvatar.querySelector(".button-avatar");
const cardSubmitButton = cardFormPopup.querySelector(".form__submit");

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

import { hasInvalidInput, toggleButtonState } from "../components/validate.js";

import {
  openPopup,
  closePopup,
  popups,
  closePopEsc,
} from "../components/utils.js";

function openAvatarPopup() {
  avatarLink.value = ""; //Сбросить значения input
  openPopup(popupFormAvatar);
  toggleButtonState(cardInputs, avatarSubmitButton, "form__submit_inactive");
}

// Функция обработки смены аватара
function handleAvatarPopup(evt) {
  evt.preventDefault(); // Не открывать в новом окне
  userPic.src = avatarLink.value; // Заменить значение src
  closePopup(popupFormAvatar);
}

//Функция обработки профиля юзера после submit
function handleSubmitProfile(evt) {
  evt.preventDefault(); // Не открывать в новом окне
  userName.textContent = formUserNameInput.value; // Присвоить name значение из формы
  userAbout.textContent = formUserAboutInput.value; // Присвоить about значение из формы
  closePopup(popupFormUser); // Закрыть попап
}

function openProfilePopup() {
  openPopup(popupFormUser);
}

// Функция обработки создания новой карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  addCard({
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
function createCard(card) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__img");
  const cardLike = cardElement.querySelector(".card__heart");
  const cardDelete = cardElement.querySelector(".card__del");
  const cardLocation = cardElement.querySelector(".card__location");
  cardLocation.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener("click", openImagePopup);
  cardLike.addEventListener("click", toggleLikes);
  cardDelete.addEventListener("click", removeCard);
  return cardElement;
}
const addCard = (card) => {
  const contentCard = createCard(card);
  cards.prepend(contentCard);
};

//Функция удаления карточки
function removeCard(evt) {
  evt.target.closest(".card").remove();
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
  removeCard,
  toggleLikes,
};
