export class Card {
  #cardName;
  #cardLink;
  #cardItem;
  #cardPicture;
  #cardTitle;
  #templateSelector;
  #handleCardClick;
  #likeButton;

  constructor(cardData, templateSelector, handleCardClick) {
    this.#cardName = cardData.name;
    this.#cardLink = cardData.link;
    this.#templateSelector = templateSelector;
    this.#handleCardClick = handleCardClick;
  }

  #likeCard() {
    this.#likeButton.classList.toggle('place__like-button_active');
  }

  #removeCard() {
    this.#cardItem.remove();
    this.#cardItem = null;
  }

  #addCardListeners() {
    this.#likeButton.addEventListener('click', this.#likeCard.bind(this));
    this.#cardItem.querySelector('.place__remove-button').addEventListener('click', this.#removeCard.bind(this));
    this.#cardPicture.addEventListener('click', () => {
      this.#handleCardClick(this.#cardName, this.#cardLink);
    });
  }

  createNewCardItem() {
    const templateElement = document.querySelector(this.#templateSelector);

    this.#cardItem = templateElement.content.querySelector('.place').cloneNode(true);
    this.#likeButton = this.#cardItem.querySelector('.place__like-button');
    this.#cardPicture = this.#cardItem.querySelector('.place__pic');
    this.#cardTitle = this.#cardItem.querySelector('.place__title');

    this.#cardPicture.setAttribute('src', this.#cardLink);
    this.#cardPicture.setAttribute('alt', `Достопримечательность ${this.#cardName}`);
    this.#cardTitle.textContent = this.#cardName;
    this.#addCardListeners();

    return this.#cardItem;
  }
}