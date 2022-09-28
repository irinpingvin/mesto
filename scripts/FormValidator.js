export class FormValidator {
  #config;
  #formElement;

  constructor(config, formElement) {
    this.#config = config;
    this.#formElement = formElement;
  }

  #hasInvalidInput(inputFieldList) {
    return inputFieldList.some(inputElement => {
      return !inputElement.validity.valid;
    })
  }

  #enableButton(buttonElement) {
    buttonElement.classList.remove(this.#config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }

  #toggleButtonState(inputFieldList, buttonElement) {
    if (this.#hasInvalidInput(inputFieldList)) {
      this.disableButton(buttonElement);
    } else {
      this.#enableButton(buttonElement);
    }
  }

  #showInputError(inputElement, errorMessage) {
    const errorElement = this.#formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.#config.errorClass);
    inputElement.classList.add(this.#config.inputErrorClass);
  }

  #hideInputError(inputElement) {
    const errorElement = this.#formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this.#config.errorClass);
    inputElement.classList.remove(this.#config.inputErrorClass);
  }

  #checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this.#showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.#hideInputError(inputElement);
    }
  }

  #setEventListener() {
    const buttonElement = this.#formElement.querySelector(this.#config.submitButtonSelector);
    const inputFieldList = Array.from(this.#formElement.querySelectorAll(this.#config.inputSelector));
    inputFieldList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this.#checkInputValidity(inputElement);
        this.#toggleButtonState(inputFieldList, buttonElement);
      });
    });
  }

  disableButton(buttonElement) {
    buttonElement.classList.add(this.#config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }

  resetPopupError() {
    const inputElementList = Array.from(this.#formElement.querySelectorAll(this.#config.inputSelector));
    inputElementList.forEach(inputElement => {
      this.#hideInputError(inputElement);
    });
  }

  enableValidation() {
    this.#setEventListener();
  }
}