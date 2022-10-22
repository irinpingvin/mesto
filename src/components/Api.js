export class Api {
  #url;
  #headers;

  constructor({url, headers}) {
    this.#url = url;
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
    return this.#handleServerResponse(fetch(`${this.#url}/users/me`, {headers: this.#headers}));
  }

  editUserInfo(userInfo) {
    return this.#handleServerResponse(fetch(`${this.#url}/users/me`, {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify(userInfo)
    }));
  }

  getCards() {
    return this.#handleServerResponse(fetch(`${this.#url}/cards`, {headers: this.#headers}));
  }
}