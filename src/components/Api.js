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
      return Promise.reject(new Error(response.status));
    })
      .catch(error => Promise.reject(error));
  }

  getUserInfo() {
    return this.#handleServerResponse(fetch(`${this.#url}/users/me`, {headers: this.#headers}));
  }

  getCards() {
    return this.#handleServerResponse(fetch(`${this.#url}/cards`, {headers: this.#headers}));
  }
}