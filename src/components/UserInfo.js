export class UserInfo {
  #userName;
  #userInfo;

  constructor({userNameSelector, userInfoSelector}) {
    this.#userName = document.querySelector(userNameSelector);
    this.#userInfo = document.querySelector(userInfoSelector);
  }

  getUserInfo() {
    return {
      userName: this.#userName.value,
      userInfo: this.#userInfo.value
    };
  }

  setUserInfo(userName, userInfo) {
    this.#userName.value = userName;
    this.#userInfo.value = userInfo;
  }
}