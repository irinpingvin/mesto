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

export {validationConfig, API_CONFIG};