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

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const profilePopup = document.querySelector('.popup_type_profile');
const profilePopupForm = profilePopup.querySelector('.popup__form');
const profilePopupNameField = profilePopup.querySelector('.popup__input_text_name');
const profilePopupInfoField = profilePopup.querySelector('.popup__input_text_info');

const cardPopup = document.querySelector('.popup_type_card');
const cardPopupNameField = cardPopup.querySelector('.popup__input_text_name');
const cardPopupInfoField = cardPopup.querySelector('.popup__input_text_info');
const cardPopupForm = cardPopup.querySelector('.popup__form');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupPicture = imagePopup.querySelector('.popup__picture');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

const cardsContainer = document.querySelector('.places__list');
const templateElement = document.querySelector('.template');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlePopupKeyDown);
  popup.addEventListener('click', handlePopupMouseClick);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePopupKeyDown);
  popup.removeEventListener('click', handlePopupMouseClick);
}

function resetPopupFormAndErrors(popup) {
  if (!popup.classList.contains('popup_type_image')) {
    popup.querySelector(validationConfig.formSelector).reset();
    resetPopupError(popup, validationConfig);
  }
}

function editProfileInfo() {
  openPopup(profilePopup);
  disableButton(profilePopupForm.querySelector(validationConfig.submitButtonSelector), validationConfig);
  profilePopupNameField.value = profileName.textContent;
  profilePopupInfoField.value = profileDescription.textContent;
}

function handleProfileSubmitForm(evt) {
  evt.preventDefault();

  profileName.textContent = profilePopupNameField.value;
  profileDescription.textContent = profilePopupInfoField.value;

  closePopup(profilePopup);
  resetPopupFormAndErrors(profilePopup);
}

function openAddCardForm() {
  openPopup(cardPopup);
  disableButton(cardPopupForm.querySelector(validationConfig.submitButtonSelector), validationConfig);
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

  openPopup(imagePopup);

  imagePopupPicture.setAttribute('src', cardPicture.getAttribute('src'));
  imagePopupPicture.setAttribute('alt', cardPicture.getAttribute('alt'));
  imagePopupCaption.textContent = cardElement.querySelector('.place__title').textContent;
}

function createNewCardItem(name, link) {
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
  cardItem.querySelector('.place__pic').addEventListener('click', (event) => openCard(event, validationConfig));
}

function handleCardSubmitForm(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createNewCardItem(cardPopupNameField.value, cardPopupInfoField.value));
  closePopup(cardPopup);
  resetPopupFormAndErrors(cardPopup);
}

function handlePopupKeyDown(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
    resetPopupFormAndErrors(openedPopup);
  }
}

function handlePopupMouseClick(event) {
  if (event.target === event.currentTarget) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
    resetPopupFormAndErrors(openedPopup);
  }
}

initialCards.forEach((item) => {
  cardsContainer.prepend(createNewCardItem(item.name, item.link));
});

profileEditButton.addEventListener('click', editProfileInfo);
profileAddButton.addEventListener('click', openAddCardForm);
profilePopupForm.addEventListener('submit', handleProfileSubmitForm);
cardPopupForm.addEventListener('submit', handleCardSubmitForm);

const buttonsClose = document.querySelectorAll('.popup__close-button');
buttonsClose.forEach(btn => btn.addEventListener('click', (event) => {
  const popup = event.target.closest('.popup');
  closePopup(popup);
  resetPopupFormAndErrors(popup);
}));

enableValidation(validationConfig);