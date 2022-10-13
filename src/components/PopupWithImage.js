import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
  #imagePopupPicture;
  #imagePopupCaption;

  constructor(popupSelector) {
    super(popupSelector);
    this.#imagePopupPicture = this.popup.querySelector('.popup__picture');
    this.#imagePopupCaption = this.popup.querySelector('.popup__caption');
  }

  open(name, link) {
    super.open();
    this.#imagePopupPicture.setAttribute('src', link);
    this.#imagePopupPicture.setAttribute('alt', `Достопримечательность ${name}`);
    this.#imagePopupCaption.textContent = name;
  }
}