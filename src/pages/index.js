import './index.css';
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {initialCards, validationConfig} from "../utils/constants.js";

const profilePopup = new PopupWithForm('.popup_type_profile', handleProfileSubmitForm);
const profilePopupForm = profilePopup.getPopup().querySelector('.popup__form');
const profilePopupNameField = profilePopup.getPopup().querySelector('.popup__input_text_name');
const profilePopupInfoField = profilePopup.getPopup().querySelector('.popup__input_text_info');

const cardPopup = new PopupWithForm('.popup_type_card', handleCardSubmitForm);
const cardPopupNameField = cardPopup.getPopup().querySelector('.popup__input_text_name');
const cardPopupInfoField = cardPopup.getPopup().querySelector('.popup__input_text_info');
const cardPopupForm = cardPopup.getPopup().querySelector('.popup__form');

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

const cardFormValidator = new FormValidator(validationConfig, cardPopupForm);
cardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(validationConfig, profilePopupForm);
profileFormValidator.enableValidation();

function editProfileInfo() {
  profilePopup.open();
  profileFormValidator.resetValidation();
  profilePopupNameField.value = profileName.textContent;
  profilePopupInfoField.value = profileDescription.textContent;
}

function handleProfileSubmitForm(evt) {
  evt.preventDefault();

  profileName.textContent = profilePopupNameField.value;
  profileDescription.textContent = profilePopupInfoField.value;

  profilePopup.close();
}

function openAddCardForm() {
  cardPopup.open();
  cardFormValidator.resetValidation();
}

function handleCardSubmitForm(evt) {
  evt.preventDefault();

  const cardData = [{
    name: cardPopupNameField.value,
    link: cardPopupInfoField.value
  }];
  createCard(cardData);

  cardPopup.close();
}

function handleCardClick(name, link) {
  const popupWithImage = new PopupWithImage('.popup_type_image');
  popupWithImage.open(name, link);
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
profilePopup.setEventListeners();
cardPopup.setEventListeners();