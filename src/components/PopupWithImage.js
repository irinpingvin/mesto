import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    super.open();
    super.setEventListeners();
    const imagePopupPicture = this.getPopup().querySelector('.popup__picture');
    const imagePopupCaption = this.getPopup().querySelector('.popup__caption');

    imagePopupPicture.setAttribute('src', link);
    imagePopupPicture.setAttribute('alt', `Достопримечательность ${name}`);
    imagePopupCaption.textContent = name;
  }
}