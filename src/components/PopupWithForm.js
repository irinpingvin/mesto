import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
  #handleSubmitForm;
  #popupSubmitForm;
  #inputValues = {};
  #inputsList;
  #submitButton;

  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this.#handleSubmitForm = handleSubmitForm;
    this.#popupSubmitForm = this.popup.querySelector('.popup__form');
    this.#inputsList = Array.from(this.#popupSubmitForm.querySelectorAll('.popup__input'));
    this.#submitButton = this.popup.querySelector('.popup__submit-button');
  }

  #getInputValues() {
    this.#inputsList.forEach(input => {
      this.#inputValues[input.name] = input.value;
    });
    return this.#inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.#popupSubmitForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#handleSubmitForm(this.#getInputValues());
    });
  }

  close() {
    super.close();
    this.#popupSubmitForm.reset();
  }

  setSubmitButtonText(text) {
    this.#submitButton.textContent = text;
  }
}