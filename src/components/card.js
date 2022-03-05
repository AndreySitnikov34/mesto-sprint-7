//Функция добавления карточки
function addCard(evt) {
  const cardItem = cardFormPopup.querySelector(".card").cloneNode(true);
  const buttonElement = cardFormPopup.querySelector(".button");
  buttonElement.textContent = "Сохранение...";
  evt.preventDefault();
  const likeCount = cardItem.querySelector(".card__heart-count");
  addNewCard({
    name: titleInputCard.value,
    link: linkInputCard.value,
    like: likeCount.textContent,
  })
    .then((card) => {
      content.prepend(createCard(card));
      closePopup(cardFormPopup);
    })
    .catch((err) => {
      console.log("Ошибка добавления карточки на сервер", err.message);
    })
    .finally(function () {
      buttonElement.textContent = "Создать";
    });
  buttonElement.classList.add("popup__button_disabled");
  buttonElement.disabled = true;
}
