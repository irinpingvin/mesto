import bogdoImage from '../images/places__bogdo.png';
import moscowImage from '../images/places__moscow.png';
import curonianSpitImage from '../images/places__curonian-spit.png';
import teriberkaImage from '../images/places__teriberka.png';
import ruskealaImage from '../images/places__ruskeala.png';
import kondukiImage from '../images/places__konduki.png';

const initialCards = [
  {
    name: 'Гора Большое Богдо',
    link: bogdoImage
  },
  {
    name: 'Москва Сити',
    link: moscowImage
  },
  {
    name: 'Куршская коса',
    link: curonianSpitImage
  },
  {
    name: 'Териберка',
    link: teriberkaImage
  },
  {
    name: 'Парк Рускеала',
    link: ruskealaImage
  },
  {
    name: 'Кондуки',
    link: kondukiImage
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

const API_CONFIG = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: '16f6b6a9-a8f1-4c03-8800-2744e7cbf369'
  }
}

export {initialCards, validationConfig, API_CONFIG};