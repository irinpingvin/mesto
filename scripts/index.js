const initialCards = [
  {
    name: 'Гора Большое Богдо',
    link: './images/places__bogdo.png'
  },
  {
    name: 'Домбай',
    link: './images/places__dombay.png'
  },
  {
    name: 'Куршская коса',
    link: './images/places__curonian-spit.png'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/places__elbrus.png'
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
const popupForm = userInputPopup.querySelector('.popup__form');
const popupNameField = userInputPopup.querySelector('.popup__input_text_name');
const popupDescriptionField = userInputPopup.querySelector('.popup__input_text_description');
const popupTitle = userInputPopup.querySelector('.popup__title');
const userInputPopupCloseButton = userInputPopup.querySelector('.popup__close-button');
const popupSubmitButton = userInputPopup.querySelector('.popup__submit-button');

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

function togglePopup(elem) {
  elem.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  if (userInputPopupMode === EDIT_PROFILE) {
    profileName.textContent = popupNameField.value;
    profileDescription.textContent = popupDescriptionField.value;
  }
  else if (userInputPopupMode === ADD_CARD) {
    placesList.prepend(createNewCardItem(popupNameField.value, popupDescriptionField.value));
  }

  togglePopup(userInputPopup);
}

function addCardItem() {
  togglePopup(userInputPopup);
  setPopupAddCardMode();
}

function setPopupAddCardMode() {
  userInputPopupMode = ADD_CARD;
  popupNameField.value = null;
  popupDescriptionField.value = null;
  popupTitle.textContent = 'Новое место';
  popupNameField.setAttribute('placeHolder', 'Название');
  popupDescriptionField.setAttribute('placeHolder', 'Ссылка на картинку');
  popupSubmitButton.textContent = 'Создать';
}

function setPopupEditProfileMode() {
  userInputPopupMode = EDIT_PROFILE;
  if (popupNameField.hasAttribute('placeHolder'))
    popupNameField.removeAttribute('placeHolder');
  if (popupDescriptionField.hasAttribute('placeHolder'))
    popupDescriptionField.removeAttribute('placeHolder');
  popupTitle.textContent = 'Редактировать профиль';
  popupNameField.value = profileName.textContent;
  popupDescriptionField.value = profileDescription.textContent;
  popupSubmitButton.textContent = 'Сохранить';
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
  const popupImage = placePopup.querySelector('.popup-place__image');
  const popupCaption = placePopup.querySelector('.popup-place__caption');

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
  placePic.setAttribute('alt', 'Достопримечательность');
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
popupForm.addEventListener('submit', formSubmitHandler);