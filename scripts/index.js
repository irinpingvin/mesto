let popup = document.querySelector('.popup');
let popupForm = popup.querySelector('.popup__form');
let popupNameField = popup.querySelector('.popup__name-field');
let popupDescriptionField = popup.querySelector('.popup__description-field');
let popupSubmitButton = popup.querySelector('.profile__submit-button');
let popupCloseButton = popup.querySelector('.popup__close-button');

let profile = document.querySelector('.profile');
let profileEditButton = profile.querySelector('.profile__edit-button');
let profileName = profile.querySelector('.profile__name');
let profileDescription = profile.querySelector('.profile__description');

function editProfileInfo() {
  popup.classList.add('popup_opened');
  popupNameField.value = profileName.textContent;
  popupDescriptionField.value = profileDescription.textContent;
}

function closeEditForm() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = popupNameField.value;
  profileDescription.textContent = popupDescriptionField.value;
  popup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', editProfileInfo);
popupCloseButton.addEventListener('click', closeEditForm);
popupForm.addEventListener('submit', formSubmitHandler);