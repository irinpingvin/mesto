import './index.css';
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithConfirmation} from "../components/PopupWithConfirmation.js";
import {UserInfo} from "../components/UserInfo.js";
import {Api} from "../components/Api.js";
import {validationConfig, API_CONFIG} from "../utils/constants.js";

const userData = new UserInfo({userNameSelector: '.profile__name', userInfoSelector: '.profile__description', userAvatarSelector: '.profile__avatar'});
let userId;

const cardSection = new Section((item) => {
  const cardItem = createCard(item);
  cardSection.addItem(cardItem);
}, '.places__list');

const api = new Api(API_CONFIG);

Promise.all([api.getUserInfo(), api.getCards()])
.then(values => {
  const [userInfo, cardsInfo] = values;

  userData.setUserInfo(userInfo.name, userInfo.about, userInfo.avatar);
  userId = userInfo._id;

  cardSection.rendererItems(cardsInfo);
})
  .catch(error => console.log(error));

const profilePopup = new PopupWithForm('.popup_type_profile', (formInputValues) => {
  profilePopup.setSubmitButtonText('Сохранение...');
  api.editUserInfo({name: formInputValues.name, about: formInputValues.info}).then((data) => {
    userData.setUserInfo(data.name, data.about, data.avatar);
    profilePopup.close();
  })
    .catch(error => console.log(error))
    .finally(() => profilePopup.setSubmitButtonText('Сохранить'));
});
const profilePopupForm = profilePopup.popup.querySelector('.popup__form');
const profilePopupNameField = profilePopup.popup.querySelector('.popup__input_text_name');
const profilePopupInfoField = profilePopup.popup.querySelector('.popup__input_text_info');

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button');
const avatarEditButton = profile.querySelector('.profile__avatar-edit-button');

const cardPopup = new PopupWithForm('.popup_type_card', (formInputValues) => {
  cardPopup.setSubmitButtonText('Создание...');
  api.addCard({name: formInputValues.title, link: formInputValues.link}).then(data => {
    const cardItem = createCard(data);
    cardSection.addItem(cardItem);
    cardPopup.close();
  })
    .catch(error => console.log(error))
    .finally(() => cardPopup.setSubmitButtonText('Создать'));
});
const cardPopupForm = cardPopup.popup.querySelector('.popup__form');

const avatarPopup = new PopupWithForm('.popup_type_avatar', (formInputValues) => {
  avatarPopup.setSubmitButtonText('Сохранение...');
  api.editUserAvatar({avatar: formInputValues.avatar}).then((data) => {
    userData.setUserInfo(data.name, data.about, data.avatar);
    avatarPopup.close();
  })
    .catch(error => console.log(error))
    .finally(() => avatarPopup.setSubmitButtonText('Сохранить'));
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

const popupWithConfirmation = new PopupWithConfirmation('.popup_type_confirm', (cardId, card) => {
  api.removeCard(cardId).then(() => {
    card.removeCard();
  })
    .catch(error => console.log(error));
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
    })
      .catch(error => console.log(error));
  else
    api.likeCard(id).then(data => {
      card.likeCard(data.likes);
    })
      .catch(error => console.log(error));
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