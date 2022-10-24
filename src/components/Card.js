export class Card {
  #cardName;
  #cardLink;
  #cardId;
  #cardLikes;
  #cardItem;
  #cardPicture;
  #cardUserId;
  #userId;
  #templateSelector;
  #handleCardClick;
  #handleRemoveClick;
  #likeButton;

  constructor(cardData, userId, templateSelector, handleCardClick, handleRemoveClick) {
    this.#cardName = cardData.name;
    this.#cardLink = cardData.link;
    this.#cardId = cardData._id;
    this.#cardLikes = cardData.likes;
    this.#cardUserId = cardData.owner._id;
    this.#userId = userId;
    this.#templateSelector = templateSelector;
    this.#handleCardClick = handleCardClick;
    this.#handleRemoveClick = handleRemoveClick;
  }

  #likeCard() {
    this.#likeButton.classList.toggle('place__like-button_active');
  }

  #addCardListeners() {
    this.#likeButton.addEventListener('click', this.#likeCard.bind(this));
    this.#cardItem.querySelector('.place__remove-button').addEventListener('click', () => {
      this.#handleRemoveClick(this.#cardId, this.#cardItem);
    });
    this.#cardPicture.addEventListener('click', () => {
      this.#handleCardClick(this.#cardName, this.#cardLink);
    });
  }

  createNewCardItem() {
    const templateElement = document.querySelector(this.#templateSelector);

    this.#cardItem = templateElement.content.querySelector('.place').cloneNode(true);
    this.#likeButton = this.#cardItem.querySelector('.place__like-button');

    this.#cardPicture = this.#cardItem.querySelector('.place__pic');
    this.#cardPicture.setAttribute('src', this.#cardLink);
    this.#cardPicture.setAttribute('alt', `Достопримечательность ${this.#cardName}`);

    this.#cardItem.querySelector('.place__title').textContent = this.#cardName;
    this.#cardItem.querySelector('.place__like-counter').textContent = this.#cardLikes.length;

    if (this.#userId === this.#cardUserId) {
      this.#cardItem.querySelector('.place__remove-button').classList.add('place__remove-button_visible');
    }

    this.#addCardListeners();

    return this.#cardItem;
  }
}