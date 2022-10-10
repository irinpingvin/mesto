export class UserInfo {
  #userName;
  #userInfo;

  constructor({userNameSelector, userInfoSelector}) {
    this.#userName = document.querySelector(userNameSelector);
    this.#userInfo = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    return {
      userName: this.#userName.textContent,
      userInfo: this.#userInfo.textContent
    };
  }

  setUserInfo(userName, userInfo) {
    this.#userName.textContent = userName;
    this.#userInfo.textContent = userInfo;
  }
}