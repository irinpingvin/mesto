import './index.css';
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupCardDeleteConfirmation} from "../components/PopupCardDeleteConfirmation.js";
import {UserInfo} from "../components/UserInfo.js";
import {Api} from "../components/Api.js";
import {validationConfig, API_CONFIG} from "../utils/constants.js";

let userId;

const api = new Api(API_CONFIG);
api.getUserInfo().then(data => {
  document.querySelector('.profile__name').textContent = data.name;
  document.querySelector('.profile__description').textContent = data.about;
  document.querySelector('.profile__avatar').textContent = data.avatar;
  userId = data._id;
});

const userData = new UserInfo({userNameSelector: '.profile__name', userInfoSelector: '.profile__description'});

const profilePopup = new PopupWithForm('.popup_type_profile', (formInputValues) => {
  api.editUserInfo({name: formInputValues.name, about: formInputValues.info}).then(() => {
    userData.setUserInfo(formInputValues.name, formInputValues.info);
  });
});
const profilePopupForm = profilePopup.popup.querySelector('.popup__form');
const profilePopupNameField = profilePopup.popup.querySelector('.popup__input_text_name');
const profilePopupInfoField = profilePopup.popup.querySelector('.popup__input_text_info');

let cardSection;

api.getCards().then(cards => {
  cardSection = new Section({items: cards, renderer: (item) => {
      const cardItem = createCard(item);
      cardSection.addItem(cardItem);
    }}, '.places__list');
  cardSection.rendererItems();
});

const cardPopup = new PopupWithForm('.popup_type_card', (formInputValues) => {
  api.addCard({name: formInputValues.title, link: formInputValues.link}).then(data => {
    const cardItem = createCard(data);
    cardSection.addItem(cardItem);
  });
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
popupWithImage.setEventListeners();

const popupWithConfirmation = new PopupCardDeleteConfirmation('.popup_type_confirm', (cardId, cardItem) => {
  api.removeCard(cardId).then(() => {
    cardItem.remove();
  });
});

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
  popupWithImage.open(name, link);
}

function handleRemoveClick(id, cardItem) {
  popupWithConfirmation.open(id, cardItem);
}

function createCard(cardData) {
  const card = new Card(cardData, userId, '.template', handleCardClick, handleRemoveClick);
  return card.createNewCardItem();
}

profileEditButton.addEventListener('click', editProfileInfo);
profileAddButton.addEventListener('click', openAddCardForm);
profilePopup.setEventListeners();
cardPopup.setEventListeners();
popupWithConfirmation.setEventListeners();