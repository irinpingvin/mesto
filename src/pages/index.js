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
  profileAvatar.setAttribute('src', data.avatar);
  profileAvatar.setAttribute('alt', 'Аватар пользователя');
  userId = data._id;
});

const userData = new UserInfo({userNameSelector: '.profile__name', userInfoSelector: '.profile__description'});

const profilePopup = new PopupWithForm('.popup_type_profile', (formInputValues) => {
  const submitButton = profilePopup.popup.querySelector('.popup__submit-button');
  submitButton.textContent = 'Сохранение...';
  api.editUserInfo({name: formInputValues.name, about: formInputValues.info}).then(() => {
    userData.setUserInfo(formInputValues.name, formInputValues.info);
  })
    .finally(() => submitButton.textContent = 'Сохранить');
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
  const submitButton = cardPopup.popup.querySelector('.popup__submit-button');
  submitButton.textContent = 'Создание...';
  api.addCard({name: formInputValues.title, link: formInputValues.link}).then(data => {
    const cardItem = createCard(data);
    cardSection.addItem(cardItem);
  }).finally(() => submitButton.textContent = 'Создать');
});
const cardPopupForm = cardPopup.popup.querySelector('.popup__form');

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const avatarEditButton = profile.querySelector('.profile__avatar-edit-button');
const profileAvatar = profile.querySelector('.profile__avatar');

const avatarPopup = new PopupWithForm('.popup_type_avatar', (formInputValues) => {
  const submitButton = avatarPopup.popup.querySelector('.popup__submit-button');
  submitButton.textContent = 'Сохранение...';
  api.editUserAvatar({avatar: formInputValues.avatar}).then((data) => {
    profileAvatar.setAttribute('src', data.avatar);
    profileAvatar.setAttribute('alt', 'Аватар пользователя');
  }).finally(() => submitButton.textContent = 'Сохранить');
});
const avatarPopupForm = avatarPopup.popup.querySelector('.popup__form');

const cardFormValidator = new FormValidator(validationConfig, cardPopupForm);
cardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(validationConfig, profilePopupForm);
profileFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(validationConfig, avatarPopupForm);
avatarFormValidator.enableValidation();

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

function editAvatar() {
  avatarPopup.open();
  avatarFormValidator.resetValidation();
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

function handleLikeCard(id, card, isLiked) {
  if (isLiked)
    api.dislikeCard(id).then(data => {
      card.likeCard(data.likes);
    });
  else
    api.likeCard(id).then(data => {
      card.likeCard(data.likes);
    });
}

function createCard(cardData) {
  const card = new Card(cardData, userId, '.template', handleCardClick, handleRemoveClick, handleLikeCard);
  return card.createNewCardItem();
}

profileEditButton.addEventListener('click', editProfileInfo);
profileAddButton.addEventListener('click', openAddCardForm);
avatarEditButton.addEventListener('click', editAvatar);
profilePopup.setEventListeners();
cardPopup.setEventListeners();
avatarPopup.setEventListeners();
popupWithConfirmation.setEventListeners();