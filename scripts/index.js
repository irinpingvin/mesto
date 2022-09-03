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

function openPopup(popup, config) {
  popup.classList.add('popup_opened');
  popup.addEventListener('keydown', handlePopupKeyDown(popup, config));
  popup.addEventListener('click', (event) => handlePopupMouseClick(event, popup, config));
  if (!popup.classList.contains('popup_type_image')) {
    disableButton(popup.querySelector(config.formSelector).querySelector(config.submitButtonSelector), config);
  }
}

function closePopup(popup, config) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('keydown', () => handlePopupKeyDown(popup, config));
  popup.removeEventListener('click', (event) => handlePopupMouseClick(event, popup, config));
  if (!popup.classList.contains('popup_type_image')) {
    popup.querySelector(config.formSelector).reset();
    resetPopupError(popup, config);
  }
}

function editProfileInfo(config) {
  openPopup(profilePopup, config);
  profilePopupNameField.value = profileName.textContent;
  profilePopupInfoField.value = profileDescription.textContent;
}

function handleProfileSubmitForm(evt) {
  evt.preventDefault();

  profileName.textContent = profilePopupNameField.value;
  profileDescription.textContent = profilePopupInfoField.value;

  closePopup(profilePopup, validationConfig);
}

function openAddCardForm(config) {
  openPopup(cardPopup, config);
}

function likeCard(evt) {
  const likeButton = evt.target.closest('.place__like-button');
  likeButton.classList.toggle('place__like-button_active');
}

function removeCard(evt) {
  const cardElement = evt.target.closest('.place');
  cardElement.remove();
}

function openCard(evt, config) {
  const cardElement = evt.target.closest('.place');
  const cardPicture = cardElement.querySelector('.place__pic');

  openPopup(imagePopup, config);

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

function handleCardSubmitForm(evt, config) {
  evt.preventDefault();
  cardsContainer.prepend(createNewCardItem(cardPopupNameField.value, cardPopupInfoField.value));
  closePopup(cardPopup, config);
}

function handlePopupKeyDown(popup, config) {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closePopup(popup, config);
    }
  });
}

function handlePopupMouseClick(event, popup, config) {
  if (event.target === event.currentTarget) {
    closePopup(popup, config);
  }
}

initialCards.forEach((item) => {
  cardsContainer.prepend(createNewCardItem(item.name, item.link));
});

profileEditButton.addEventListener('click', () => editProfileInfo(validationConfig));
profileAddButton.addEventListener('click', () => openAddCardForm(validationConfig));
profilePopupForm.addEventListener('submit', handleProfileSubmitForm);
cardPopupForm.addEventListener('submit', (event) => handleCardSubmitForm(event, validationConfig));

const buttonsClose = document.querySelectorAll('.popup__close-button');
buttonsClose.forEach(btn => btn.addEventListener('click', (event) => closePopup(event.target.closest('.popup'), validationConfig)));

enableValidation(validationConfig);