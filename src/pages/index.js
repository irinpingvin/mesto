import './index.css';
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {UserInfo} from "../components/UserInfo.js";
import {initialCards, validationConfig} from "../utils/constants.js";

const userData = new UserInfo({userNameSelector: '.profile__name', userInfoSelector: '.profile__description'});

const profilePopup = new PopupWithForm('.popup_type_profile', (formInputValues) => {
  userData.setUserInfo(formInputValues.name, formInputValues.info);
});
const profilePopupForm = profilePopup.popup.querySelector('.popup__form');
const profilePopupNameField = profilePopup.popup.querySelector('.popup__input_text_name');
const profilePopupInfoField = profilePopup.popup.querySelector('.popup__input_text_info');

const cardSection = new Section({items: initialCards, renderer: (item) => {
    const cardItem = createCard(item);
    cardSection.addItem(cardItem);
  }}, '.places__list');
cardSection.rendererItems();

const cardPopup = new PopupWithForm('.popup_type_card', (formInputValues) => {
  const cardItem = createCard({name: formInputValues.title, link: formInputValues.link});
  cardSection.addItem(cardItem);
});
const cardPopupForm = cardPopup.popup.querySelector('.popup__form');

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');

const cardFormValidator = new FormValidator(validationConfig, cardPopupForm);
cardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(validationConfig, profilePopupForm);
profileFormValidator.enableValidation();

const popupWithImage = new PopupWithImage('.popup_type_image');

function editProfileInfo() {
  profilePopup.open();
  profileFormValidator.resetValidation();

  const {userName, userInfo} = userData.getUserInfo();
  profilePopupNameField.value = userName;
  profilePopupInfoField.value = userInfo;
}

function openAddCardForm() {
  cardPopup.open();
  cardFormValidator.resetValidation();
}

function handleCardClick(name, link) {
  popupWithImage.setEventListeners();
  popupWithImage.open(name, link);
}

function createCard(cardData) {
  const card = new Card(cardData, '.template', handleCardClick);
  return card.createNewCardItem();
}

profileEditButton.addEventListener('click', editProfileInfo);
profileAddButton.addEventListener('click', openAddCardForm);
profilePopup.setEventListeners();
cardPopup.setEventListeners();