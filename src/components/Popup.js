export class Popup {
  #popup;

  constructor(popupSelector) {
    this.#popup = document.querySelector(popupSelector);
  }

  getPopup() {
    return this.#popup;
  }

  #handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  #handlePopupMouseClick(event) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  open() {
    this.#popup.classList.add('popup_opened');
    document.addEventListener('keydown', this.#handleEscClose.bind(this));
  }

  close() {
    this.#popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.#handleEscClose.bind(this));
  }

  setEventListeners() {
    const closeButton = this.#popup.querySelector('.popup__close-button');
    closeButton.addEventListener('click', this.#handlePopupMouseClick.bind(this));

    this.#popup.addEventListener('click', this.#handlePopupMouseClick.bind(this));
  }
}