function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
  inputElement.classList.add(config.inputErrorClass);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
  inputElement.classList.remove(config.inputErrorClass);
}

function hasInvalidInput(inputFieldList) {
  return inputFieldList.some(inputElement => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputFieldList, buttonElement, config) {
  if (hasInvalidInput(inputFieldList)) {
    disableButton(buttonElement, config);
  } else {
    enableButton(buttonElement, config);
  }
}

function enableButton(buttonElement, config) {
  buttonElement.classList.remove(config.inactiveButtonClass);
}

function disableButton(buttonElement, config) {
  buttonElement.classList.add(config.inactiveButtonClass);
}

function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function setEventListener(formElement, config) {
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  const inputFieldList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputFieldList.forEach(inputElement => {
    inputElement.addEventListener('input', function() {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputFieldList, buttonElement, config);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(formElement, config);
  });
}