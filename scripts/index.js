const popup = document.querySelector('.popup');
const popupForm = popup.querySelector('.popup__form');
const popupNameField = popup.querySelector('.popup__input_text_name');
const popupDescriptionField = popup.querySelector('.popup__input_text_description');
const popupCloseButton = popup.querySelector('.popup__close-button');

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

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
  closeEditForm();
}

profileEditButton.addEventListener('click', editProfileInfo);
popupCloseButton.addEventListener('click', closeEditForm);
popupForm.addEventListener('submit', formSubmitHandler);