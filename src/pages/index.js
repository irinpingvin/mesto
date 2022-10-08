import './index.css';
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {initialCards, validationConfig} from "../utils/constants.js";

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
  profileFormValidator.resetValidation();
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
  cardFormValidator.resetValidation();
}

function handleCardSubmitForm(evt) {
  evt.preventDefault();

  const cardData = [{
    name: cardPopupNameField.value,
    link: cardPopupInfoField.value
  }];
  createCard(cardData);

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
    closePopup(event.target);
  }
}

function handleCardClick(name, link) {
  const imagePopup = document.querySelector('.popup_type_image');
  const imagePopupPicture = imagePopup.querySelector('.popup__picture');
  const imagePopupCaption = imagePopup.querySelector('.popup__caption');

  openPopup(imagePopup);

  imagePopupPicture.setAttribute('src', link);
  imagePopupPicture.setAttribute('alt', `Достопримечательность ${name}`);
  imagePopupCaption.textContent = name;
}

function createCard(cardData) {
  const cardSection = new Section({items: cardData, renderer: (item) => {
      const card = new Card(item, '.template', handleCardClick);
      const cardItem = card.createNewCardItem();
      cardSection.addItem(cardItem);
    }}, '.places__list');

  cardSection.rendererItems();
}

createCard(initialCards);

profileEditButton.addEventListener('click', editProfileInfo);
profileAddButton.addEventListener('click', openAddCardForm);
profilePopupForm.addEventListener('submit', handleProfileSubmitForm);
cardPopupForm.addEventListener('submit', handleCardSubmitForm);

const buttonsClose = document.querySelectorAll('.popup__close-button');
buttonsClose.forEach(btn => btn.addEventListener('click', (event) => closePopup(event.target.closest('.popup'), validationConfig)));