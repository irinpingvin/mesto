export class UserInfo {
  #userName;
  #userInfo;
  #userAvatar;

  constructor({userNameSelector, userInfoSelector, userAvatarSelector}) {
    this.#userName = document.querySelector(userNameSelector);
    this.#userInfo = document.querySelector(userInfoSelector);
    this.#userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      userName: this.#userName.textContent,
      userInfo: this.#userInfo.textContent,
      userAvatar: this.#userAvatar.getAttribute('src')
    };
  }

  setUserInfo(userName, userInfo, userAvatar) {
    this.#userName.textContent = userName;
    this.#userInfo.textContent = userInfo;
    this.#userAvatar.setAttribute('src', userAvatar);
    this.#userAvatar.setAttribute('alt', 'Аватар пользователя');
  }
}