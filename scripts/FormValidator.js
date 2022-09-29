export class FormValidator {
  #config;
  #formElement;
  #inputElementsList;
  #formButton;

  constructor(config, formElement) {
    this.#config = config;
    this.#formElement = formElement;
    this.#inputElementsList = Array.from(this.#formElement.querySelectorAll(this.#config.inputSelector));
    this.#formButton = this.#formElement.querySelector(this.#config.submitButtonSelector);
  }

  #hasInvalidInput() {
    return this.#inputElementsList.some(inputElement => {
      return !inputElement.validity.valid;
    })
  }

  #enableButton() {
    this.#formButton.classList.remove(this.#config.inactiveButtonClass);
    this.#formButton.removeAttribute('disabled');
  }

  #disableButton() {
    this.#formButton.classList.add(this.#config.inactiveButtonClass);
    this.#formButton.setAttribute('disabled', true);
  }

  #toggleButtonState() {
    if (this.#hasInvalidInput()) {
      this.#disableButton();
    } else {
      this.#enableButton();
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
    this.#inputElementsList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this.#checkInputValidity(inputElement);
        this.#toggleButtonState();
      });
    });
  }

  resetValidation() {
    this.#disableButton();
    this.#inputElementsList.forEach(inputElement => {
      this.#hideInputError(inputElement);
    });
  }

  enableValidation() {
    this.#setEventListener();
  }
}