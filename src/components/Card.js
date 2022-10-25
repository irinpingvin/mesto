export class Card {
  #cardName;
  #cardLink;
  #cardId;
  #cardLikes;
  #cardLikeCounter;
  #cardItem;
  #cardPicture;
  #cardUserId;
  #userId;
  #templateSelector;
  #handleCardClick;
  #handleRemoveClick;
  #handleLikeCard;
  #likeButton;

  constructor(cardData, userId, templateSelector, handleCardClick, handleRemoveClick, handleLikeCard) {
    this.#cardName = cardData.name;
    this.#cardLink = cardData.link;
    this.#cardId = cardData._id;
    this.#cardLikes = cardData.likes;
    this.#cardUserId = cardData.owner._id;
    this.#userId = userId;
    this.#templateSelector = templateSelector;
    this.#handleCardClick = handleCardClick;
    this.#handleRemoveClick = handleRemoveClick;
    this.#handleLikeCard = handleLikeCard;
  }

  likeCard(likes) {
    this.#likeButton.classList.toggle('place__like-button_active');
    this.#cardLikeCounter.textContent = likes.length;
  }

  #addCardListeners() {
    this.#likeButton.addEventListener('click', () => {
      if (this.#likeButton.classList.contains('place__like-button_active'))
        this.#handleLikeCard(this.#cardId, this, true);
      else this.#handleLikeCard(this.#cardId, this, false);
    });
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
    this.#cardLikeCounter = this.#cardItem.querySelector('.place__like-counter');

    if (this.#cardLikes.some(like => { return this.#userId === like._id }))
      this.likeCard(this.#cardLikes);
    else this.#cardLikeCounter.textContent = this.#cardLikes.length;

    if (this.#userId === this.#cardUserId) {
      this.#cardItem.querySelector('.place__remove-button').classList.add('place__remove-button_visible');
    }

    this.#addCardListeners();

    return this.#cardItem;
  }
}