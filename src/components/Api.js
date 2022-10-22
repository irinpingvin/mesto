export class Api {
  #url;
  #headers;

  constructor({url, headers}) {
    this.#url = url;
    this.#headers = headers;
  }

  getUserInfo() {
    return fetch(`${this.#url}/users/me`, {headers: this.#headers})
      .then(response => {
        if (response.ok)
          return response.json();
        return Promise.reject(new Error(response.status));
      })
      .catch(error => Promise.reject(error))
  }
}