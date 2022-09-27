import {openPopup} from "./index.js";

export class Card {
  #name;
  #link;
  #templateSelector;
  #cardItem;

  constructor(name, link, templateSelector) {
    this.#name = name;
    this.#link = link;
    this.#templateSelector = templateSelector;
  }

  #likeCard(evt) {
    const likeButton = evt.target.closest('.place__like-button');
    likeButton.classList.toggle('place__like-button_active');
  }

  #removeCard(evt) {
    const cardElement = evt.target.closest('.place');
    cardElement.remove();
  }

  #openCard(evt) {
    const cardElement = evt.target.closest('.place');
    const cardPicture = cardElement.querySelector('.place__pic');

    const imagePopup = document.querySelector('.popup_type_image');
    const imagePopupPicture = imagePopup.querySelector('.popup__picture');
    const imagePopupCaption = imagePopup.querySelector('.popup__caption');

    openPopup(imagePopup);

    imagePopupPicture.setAttribute('src', cardPicture.getAttribute('src'));
    imagePopupPicture.setAttribute('alt', cardPicture.getAttribute('alt'));
    imagePopupCaption.textContent = cardElement.querySelector('.place__title').textContent;
  }

  #addCardListeners() {
    this.#cardItem.querySelector('.place__like-button').addEventListener('click', this.#likeCard.bind(this));
    this.#cardItem.querySelector('.place__remove-button').addEventListener('click', this.#removeCard.bind(this));
    this.#cardItem.querySelector('.place__pic').addEventListener('click', this.#openCard.bind(this));
  }

  createNewCardItem() {
    this.#cardItem = this.#templateSelector.content.cloneNode(true);
    const placePic = this.#cardItem.querySelector('.place__pic');

    placePic.setAttribute('src', this.#link);
    placePic.setAttribute('alt', `Достопримечательность ${this.#name}`);
    this.#cardItem.querySelector('.place__title').textContent = this.#name;
    this.#addCardListeners();

    return this.#cardItem;
  }
}