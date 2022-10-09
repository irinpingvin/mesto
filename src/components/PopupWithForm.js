import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
  #handleSubmitForm;
  #popupSubmitForm;

  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this.#handleSubmitForm = handleSubmitForm;
    this.#popupSubmitForm = this.getPopup().querySelector('.popup__form');
  }

  #getInputValues() {

  }

  setEventListeners() {
    super.setEventListeners();
    this.#popupSubmitForm.addEventListener('submit', this.#handleSubmitForm.bind(this));
  }

  close() {
    super.close();
    this.#popupSubmitForm.reset();
  }
}