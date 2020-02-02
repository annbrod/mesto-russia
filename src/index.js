import "./pages/index.css";

import Api from "./modules/api";
import Owner from "./modules/Owner";
import initialCards from "./modules/initialCards";
import UserInfo from "./modules/UserInfo";
import Card from "./modules/card";
import CardList from "./modules/CardList";
import Popup from "./modules/Popup";
import PopupPlace from "./modules/PopupPlace";
import PopupEdit from "./modules/PopupEdit";
import PopupImage from "./modules/PopupImage"



/*Переменные*/

const config = {
  url: 'http://95.216.175.5/cohort6',
  headers: {
    authorization: '42a98203-de24-427c-bcb2-c8aceb066d38',
    'Content-Type': 'application/json'
  }
};

const api = new Api(config);

const newCardPopup = document.querySelector(".popup");
const editProfilePopup = document.querySelector(".profile-popup");
const imagePopup = document.querySelector(".image-popup");

const owner = new Owner();

const userInfoDom = document.querySelector('.user-info');


//Объект с текстом ошибок
const errorMessages = {
  emptyField: "Это обязательное поле",
  outOfRange: "Должно быть от 2 до 30 символов",
  invalidUrl: "Здесь должна быть ссылка",
  correctInput: ""
};

//Карточка
const card = new Card(api, owner);
console.log(card);


//Контейнер для карточек
const list = new CardList(document.querySelector(".places-list"), card, api);
console.log(list);

//  list.render();

const userInfo = new UserInfo(api, owner);
//Получает данные с сервера
userInfo.getUserInfo("/users/me");

//Попап Place
const place = new PopupPlace(newCardPopup, list);



//Попап Edit
const edit = new PopupEdit(
  document.querySelector(".profile-popup"),

  userInfo,
  api
);

//Попап картинки
const image = new PopupImage(imagePopup);

/*Функции*/


//Добавляем карточки в контейнер
list.render("/cards");


//Функция валидации форм

function validate(event) {
  const [formInput1, formInput2] = event.currentTarget.elements;

  if (!formInput1.validity.valid || !formInput2.validity.valid) {
    //Если какое-то поле не валидно, проверить поля и вывести сообщение

    checkEmptyField(event, formInput1, formInput2);
    checkSymbols(event, formInput1);
    checkUrl(event, formInput2);
    checkIfCorrect(event, formInput1, formInput2);
    disableButton(event);
  } else {
    enableButton(event);
    checkIfCorrect(event, formInput1, formInput2);

  }
}

// Проверка на корректность ввода (убирает сообщения об ошибках)

function checkIfCorrect(event, ...inputsArr) {
  if (event.target.validity.valid) {
    inputsArr.forEach(input => {
      if (event.target.name === input.name) {
        document.querySelector(`#error-${input.name}`).textContent = errorMessages.correctInput;
      }
    });
  }
}

//Проверка на пустое поле
function checkEmptyField(event, ...inputsArr) {
  //inputsArr - все инпуты, которые передаются функции
  if (event.target.value == "") {
    inputsArr.forEach(input => {
      if (event.target.name === input.name) {
        document.querySelector(`#error-${input.name}`).textContent =
          errorMessages.emptyField;
      }
    });
  }
}

//Проверка количества символов

function checkSymbols(event, ...inputsArr) {
  if (event.target.value.length === 1 || event.target.value.length > 30) {
    inputsArr.forEach(input => {
      if (event.target.name === input.name && input.name !== "link") {
        document.querySelector(`#error-${input.name}`).textContent =
          errorMessages.outOfRange;
      }
    });
  }
}

//Проверка ссылки

function checkUrl(event, ...inputsArr) {
  if (!event.target.validity.valid && event.target.value.length !== 0) {
    inputsArr.forEach(input => {
      if (event.target.name === input.name && input.name == "link") {
        document.querySelector(`#error-${input.name}`).textContent =
          errorMessages.invalidUrl;
      } else if (input.name !== "link") {
        checkSymbols(event, input);
      }
    });
  }
}

//Функция отключения кнопки формы
function disableButton(event) {
  const formButton = event.currentTarget.querySelector(".popup__button");

  formButton.setAttribute("disabled", true);
  formButton.classList.add("popup__button_disabled");
  formButton.classList.remove("popup__button_enabled");
}

//Функция включения кнопки формы
function enableButton(event) {
  const formButton = event.currentTarget.querySelector(".popup__button");

  formButton.removeAttribute("disabled");
  formButton.classList.remove("popup__button_disabled");
  formButton.classList.add("popup__button_enabled");
}

/* Слушатели */

//Слушатель валидации формы добавления карточки
place.form.addEventListener("input", validate);

//Слушатель валидации формы изменения профиля
edit.form.addEventListener("input", validate);

//Слушатель открытия попапа добавления карточки
document.querySelector(".user-info__button").addEventListener("click", event => {
  place.open(event);
});
//Слушатель закрытия попапа добавления карточки
document.querySelector(".popup__close").addEventListener("click", event => {
  place.close(event);
});

//Слушатель формы добавления карточки

place.form.addEventListener("submit", event => {
  place.submit(event);
});

//Слушатель открытия формы изменения профиля
document.querySelector(".user-info__edit").addEventListener("click", event => {
  edit.open(event);
});

//Слушатель закрытия формы изменения профиля
document.querySelector(".popup__close_type_edit").addEventListener("click", event => {
  edit.close(event);
});

//Слушатель формы измененния профиля
edit.form.addEventListener("submit", event => {
  edit.edit("/users/me", event);
});


//Слушатель открытия попапа с картинкой
document.querySelector(".places-list").addEventListener("click", event => {
  image.open(event);
});

//Cлушатель закрытия попапа с картинкой
document.querySelector(".image-popup__close").addEventListener("click", event => {
  image.close(event);
});

//Слушатель лайка и удаления карточки
list.container.addEventListener("click", event => {
  card.like(event);
  card.remove(event);
});


