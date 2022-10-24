export class Api {
  #userUrl;
  #cardsUrl;
  #headers;

  constructor({userUrl, cardsUrl, headers}) {
    this.#userUrl = userUrl;
    this.#cardsUrl = cardsUrl;
    this.#headers = headers;
  }

  #handleServerResponse(promise) {
    return promise.then(response => {
      if (response.ok)
        return response.json();
      return Promise.reject(`Ошибка: ${response.status}`);
    })
      .catch(error => console.log(error));
  }

  getUserInfo() {
    return this.#handleServerResponse(fetch(this.#userUrl, {headers: this.#headers}));
  }

  editUserInfo(userInfo) {
    return this.#handleServerResponse(fetch(this.#userUrl, {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify(userInfo)
    }));
  }

  getCards() {
    return this.#handleServerResponse(fetch(this.#cardsUrl, {headers: this.#headers}));
  }

  addCard(cardInfo) {
    return this.#handleServerResponse(fetch(this.#cardsUrl, {
      method: 'POST',
      headers: this.#headers,
      body: JSON.stringify(cardInfo)
    }));
  }

  removeCard(id) {
    return this.#handleServerResponse(fetch(`${this.#cardsUrl}/${id}`, {
      method: 'DELETE',
      headers: this.#headers
    }));
  }
}