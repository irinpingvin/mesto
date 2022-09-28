import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

export {openPopup};

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

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

const cardsContainer = document.querySelector('.places__list');
const templateElement = document.querySelector('.template');

const cardFormValidator = new FormValidator(validationConfig, cardPopupForm);
cardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(validationConfig, profilePopupForm);
profileFormValidator.enableValidation();

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

function editProfileInfo() {
  openPopup(profilePopup);
  profileFormValidator.resetPopupError();
  profileFormValidator.disableButton(profilePopupForm.querySelector(validationConfig.submitButtonSelector));
  profilePopupNameField.value = profileName.textContent;
  profilePopupInfoField.value = profileDescription.textContent;
}

function handleProfileSubmitForm(evt) {
  evt.preventDefault();

  profileName.textContent = profilePopupNameField.value;
  profileDescription.textContent = profilePopupInfoField.value;

  closePopup(profilePopup);
}

function openAddCardForm() {
  openPopup(cardPopup);
  cardPopupForm.reset();
  cardFormValidator.resetPopupError();
  cardFormValidator.disableButton(cardPopupForm.querySelector(validationConfig.submitButtonSelector));
}

function handleCardSubmitForm(evt) {
  evt.preventDefault();
  cardsContainer.prepend(new Card(cardPopupNameField.value, cardPopupInfoField.value, templateElement).createNewCardItem());
  closePopup(cardPopup);
}

function handlePopupKeyDown(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function handlePopupMouseClick(event) {
  if (event.target === event.currentTarget) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

initialCards.forEach((item) => {
  cardsContainer.prepend(new Card(item.name, item.link, templateElement).createNewCardItem());
});

profileEditButton.addEventListener('click', editProfileInfo);
profileAddButton.addEventListener('click', openAddCardForm);
profilePopupForm.addEventListener('submit', handleProfileSubmitForm);
cardPopupForm.addEventListener('submit', handleCardSubmitForm);

const buttonsClose = document.querySelectorAll('.popup__close-button');
buttonsClose.forEach(btn => btn.addEventListener('click', (event) => closePopup(event.target.closest('.popup'), validationConfig)));