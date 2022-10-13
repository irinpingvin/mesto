export class Popup {
  popup;
  #escCloseHandler;

  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this.#escCloseHandler = this.#handleEscClose.bind(this)
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
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', this.#escCloseHandler);
  }

  close() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.#escCloseHandler);
  }

  setEventListeners() {
    const closeButton = this.popup.querySelector('.popup__close-button');
    closeButton.addEventListener('click', this.#handlePopupMouseClick.bind(this));

    this.popup.addEventListener('click', this.#handlePopupMouseClick.bind(this));
  }
}