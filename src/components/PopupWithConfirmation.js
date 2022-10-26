import {Popup} from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  #submitButton;
  #handleConfirmation;
  #cardId;
  #cardItem;

  constructor(popupSelector, handleConfirmation) {
    super(popupSelector);
    this.#handleConfirmation = handleConfirmation;
    this.#submitButton = this.popup.querySelector('.popup__submit-button');
  }

  open(cardId, cardItem) {
    super.open();
    this.#cardId = cardId;
    this.#cardItem = cardItem;
  }

  setEventListeners() {
    super.setEventListeners();
    this.#submitButton.addEventListener('click', () => {
      this.#handleConfirmation(this.#cardId, this.#cardItem);
      this.close();
    });
  }
}