const initialCards = [
  {
    name: 'Гора Большое Богдо',
    link: './images/places__bogdo.png'
  },
  {
    name: 'Москва Сити',
    link: './images/places__moscow.png'
  },
  {
    name: 'Куршская коса',
    link: './images/places__curonian-spit.png'
  },
  {
    name: 'Териберка',
    link: './images/places__teriberka.png'
  },
  {
    name: 'Парк Рускеала',
    link: './images/places__ruskeala.png'
  },
  {
    name: 'Кондуки',
    link: './images/places__konduki.png'
  }
];

const userInputPopup = document.querySelector('.popup_type_user-input');
const userInputPopupForm = userInputPopup.querySelector('.popup__form');
const userInputPopupNameField = userInputPopup.querySelector('.popup__input_text_name');
const userInputPopupInfoField = userInputPopup.querySelector('.popup__input_text_info');
const userInputPopupTitle = userInputPopup.querySelector('.popup__title');
const userInputPopupCloseButton = userInputPopup.querySelector('.popup__close-button');
const userInputPopupSubmitButton = userInputPopup.querySelector('.popup__submit-button');

let userInputPopupMode = null;
const EDIT_PROFILE = 'editProfile';
const ADD_CARD = 'addCard;'

const placePopup = document.querySelector('.popup_type_place');
const placePopupCloseButton = placePopup.querySelector('.popup__close-button');

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

const placesList = document.querySelector('.places__list');

function editProfileInfo() {
  togglePopup(userInputPopup);
  setPopupEditProfileMode();
}

function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  if (userInputPopupMode === EDIT_PROFILE) {
    profileName.textContent = userInputPopupNameField.value;
    profileDescription.textContent = userInputPopupInfoField.value;
  }
  else if (userInputPopupMode === ADD_CARD) {
    placesList.prepend(createNewCardItem(userInputPopupNameField.value, userInputPopupInfoField.value));
  }

  togglePopup(userInputPopup);
}

function addCardItem() {
  togglePopup(userInputPopup);
  setPopupAddCardMode();
}

function setPopupAddCardMode() {
  userInputPopupMode = ADD_CARD;
  userInputPopupNameField.value = null;
  userInputPopupInfoField.value = null;
  userInputPopupTitle.textContent = 'Новое место';
  userInputPopupNameField.setAttribute('placeHolder', 'Название');
  userInputPopupInfoField.setAttribute('placeHolder', 'Ссылка на картинку');
  userInputPopupSubmitButton.textContent = 'Создать';
}

function setPopupEditProfileMode() {
  userInputPopupMode = EDIT_PROFILE;

  if (userInputPopupNameField.hasAttribute('placeHolder'))
    userInputPopupNameField.removeAttribute('placeHolder');
  if (userInputPopupInfoField.hasAttribute('placeHolder'))
    userInputPopupInfoField.removeAttribute('placeHolder');

  userInputPopupTitle.textContent = 'Редактировать профиль';
  userInputPopupNameField.value = profileName.textContent;
  userInputPopupInfoField.value = profileDescription.textContent;
  userInputPopupSubmitButton.textContent = 'Сохранить';
}

function likeCard(evt) {
  const likeButton = evt.target.closest('.place__like-button');
  likeButton.classList.toggle('place__like-button_active');
}

function removeCard(evt) {
  const cardElement = evt.target.closest('.place');
  cardElement.remove();
}

function openCard(evt) {
  const cardElement = evt.target.closest('.place');
  const cardPicture = cardElement.querySelector('.place__pic');
  const popupImage = placePopup.querySelector('.popup__image');
  const popupCaption = placePopup.querySelector('.popup__caption');

  togglePopup(placePopup);

  popupImage.setAttribute('src', cardPicture.getAttribute('src'));
  popupImage.setAttribute('alt', cardPicture.getAttribute('alt'));
  popupCaption.textContent = cardElement.querySelector('.place__title').textContent;
}

function createNewCardItem(name, link) {
  const templateElement = document.querySelector('.template');
  const newCardItem = templateElement.content.cloneNode(true);
  const placePic = newCardItem.querySelector('.place__pic');

  placePic.setAttribute('src', link);
  placePic.setAttribute('alt', `Достопримечательность ${name}`);
  newCardItem.querySelector('.place__title').textContent = name;
  addCardListeners(newCardItem);

  return newCardItem;
}

function addCardListeners(cardItem) {
  cardItem.querySelector('.place__like-button').addEventListener('click', likeCard);
  cardItem.querySelector('.place__remove-button').addEventListener('click', removeCard);
  cardItem.querySelector('.place__pic').addEventListener('click', openCard);
}

initialCards.forEach((item) => {
  placesList.prepend(createNewCardItem(item.name, item.link));
});

profileEditButton.addEventListener('click', editProfileInfo);
profileAddButton.addEventListener('click', addCardItem);
userInputPopupCloseButton.addEventListener('click', () => {
  togglePopup(userInputPopup);
});
placePopupCloseButton.addEventListener('click', () => {
  togglePopup(placePopup);
})
userInputPopupForm.addEventListener('submit', formSubmitHandler);