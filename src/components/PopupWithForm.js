import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
  #handleSubmitForm;
  #popupSubmitForm;
  #inputValues = {};

  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this.#handleSubmitForm = handleSubmitForm;
    this.#popupSubmitForm = this.getPopup().querySelector('.popup__form');
  }

  #getInputValues() {
    const inputsList = Array.from(this.#popupSubmitForm.querySelectorAll('.popup__input'));
    inputsList.forEach(input => {
      this.#inputValues[input.name] = input.value;
    });
    return this.#inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.#popupSubmitForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#handleSubmitForm(this.#getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this.#popupSubmitForm.reset();
  }
}