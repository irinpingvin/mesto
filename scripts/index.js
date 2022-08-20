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

const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup__form');
const popupNameField = popup.querySelector('.popup__input_text_name');
const popupDescriptionField = popup.querySelector('.popup__input_text_description');
const popupTitle = popup.querySelector('.popup__title');
const popupCloseButton = popup.querySelector('.popup__close-button');
const popupSubmitButton = popup.querySelector('.popup__submit-button');

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

const placesList = document.querySelector('.places__list');

let popupMode = null;
const EDIT_PROFILE = 'editProfile';
const ADD_CARD = 'addCard;'

function editProfileInfo() {
  openEditForm();
  setPopupEditProfileMode();
}

function openEditForm() {
  popup.classList.add('popup_opened');
}

function closeEditForm() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  if (popupMode === EDIT_PROFILE) {
    profileName.textContent = popupNameField.value;
    profileDescription.textContent = popupDescriptionField.value;
  }
  else if (popupMode === ADD_CARD) {
    placesList.prepend(createNewCardItem(popupNameField.value, popupDescriptionField.value));
  }

  closeEditForm();
}

function addCardItem() {
  openEditForm();
  setPopupAddCardMode();
}

function setPopupAddCardMode() {
  popupMode = ADD_CARD;
  popupTitle.textContent = 'Новое место';
  popupNameField.setAttribute('placeHolder', 'Название');
  popupDescriptionField.setAttribute('placeHolder', 'Ссылка на картинку');
  popupSubmitButton.textContent = 'Создать';
}

function setPopupEditProfileMode() {
  popupMode = EDIT_PROFILE;
  if (popupNameField.hasAttribute('placeHolder'))
    popupNameField.removeAttribute('placeHolder');
  if (popupDescriptionField.hasAttribute('placeHolder'))
    popupDescriptionField.removeAttribute('placeHolder');
  popupTitle.textContent = 'Редактировать профиль';
  popupNameField.value = profileName.textContent;
  popupDescriptionField.value = profileDescription.textContent;
  popupSubmitButton.textContent = 'Сохранить';
}

function createNewCardItem(name, link) {
  const templateElement = document.querySelector('.template');
  const newCardItem = templateElement.content.cloneNode(true);
  const placePic = newCardItem.querySelector('.place__pic');
  placePic.setAttribute('src', link);
  placePic.setAttribute('alt', 'Достопримечательность');
  newCardItem.querySelector('.place__title').textContent = name;

  return newCardItem;
}

initialCards.forEach((item) => {
  placesList.prepend(createNewCardItem(item.name, item.link));
});

profileEditButton.addEventListener('click', editProfileInfo);
profileAddButton.addEventListener('click', addCardItem);
popupCloseButton.addEventListener('click', closeEditForm);
popupForm.addEventListener('submit', formSubmitHandler);