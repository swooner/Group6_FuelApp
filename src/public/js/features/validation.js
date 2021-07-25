import { _id } from "../utilities/helper.js";
//Variables
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordPattern = /(\s)/g;
let validEmail = null;
let validPassword = null;
let validSignupEmail = null;
let validSignupPassword = null;
let validsignupConfirmPassword = null;
//Observation for variable changes
const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    // Email and Password validation to unlock sign in button
    if (validEmail === null || validPassword === null) {
      signInBtn.disabled = true;
      signInBtn.classList.remove("generalButton--active");
    }
    if (
      mutation.target.id === "email" &&
      mutation.target.dataset.valid !== "null"
    ) {
      validEmail = true;
    } else if (
      mutation.target.id === "password" &&
      mutation.target.dataset.valid !== "null"
    ) {
      validPassword = true;
    }
    if (validEmail && validPassword) {
      signInBtn.disabled = false;
      signInBtn.classList.add("generalButton--active");
    }
    // Email, password, and password confirm to unlock sign up button
    if (
      validSignupEmail === null ||
      validSignupPassword === null ||
      validsignupConfirmPassword === null
    ) {
      signUpBtn.disabled = true;
      signUpBtn.classList.remove("generalButton--active");
    }
    if (
      mutation.target.id === "signupEmail" &&
      mutation.target.dataset.valid !== "null"
    ) {
      validSignupEmail = true;
    } else if (
      mutation.target.id === "signupPassword" &&
      mutation.target.dataset.valid !== "null"
    ) {
      validSignupPassword = true;
    } else if (
      mutation.target.id === "signupConfirmPassword" &&
      mutation.target.dataset.valid !== "null"
    ) {
      validsignupConfirmPassword = true;
    }
    if (validSignupEmail && validSignupPassword && validsignupConfirmPassword) {
      signUpBtn.disabled = false;
      signUpBtn.classList.add("generalButton--active");
    }
  });
});
// configuration for observation function
const config = { attributes: true };

// add or remove classes and forms
const addClasses = (inputBox, message) => {
  inputBox.nextElementSibling.classList.add(
    "errorMessage--shown",
    "errorMessage--error"
  );
  inputBox.nextElementSibling.innerHTML = `${message}`;
};
const removeClasses = (inputBox) => {
  inputBox.nextElementSibling.classList.remove(
    "errorMessage--shown",
    "errorMessage--error"
  );
};

const showSuggestionForm = (form) => {
  form.classList.add("passwordContainer--active");
};
const removeSuggestionForm = (form) => {
  form.classList.add("passwordContainer--remove");
  setTimeout(() => {
    form.classList.remove("passwordContainer--active");
    form.classList.remove("passwordContainer--remove");
  }, 200);
};

// validation signin form
export const validatedInput = () => {
  const email = _id("email");
  const password = _id("password");
  const signInBtn = _id("signInBtn");
  if (!email) return;
  observer.observe(email, config);
  observer.observe(password, config);

  email.addEventListener("focusout", (e) => {
    let inputValue = e.target.value;
    if (inputValue.trim().length === 0 || inputValue.trim() === "") {
      addClasses(email, `Email cannot be empty!`);
      validEmail = null;
      e.target.dataset.valid = "null";
      return;
    }
    if (!emailPattern.test(inputValue)) {
      addClasses(email, `Email is not valid!`);
      e.target.dataset.valid = "null";
      validEmail = null;

      return;
    }
    email.dataset.valid = "true";
    removeClasses(email);
  });
  password.addEventListener("focusout", (e) => {
    let inputValue = e.target.value;
    if (inputValue.trim().length === 0 || inputValue.trim() === "") {
      addClasses(password, `Password cannot be empty!`);
      e.target.dataset.valid = "null";
      validPassword = null;
      return;
    }
    if (inputValue.trim().length < 8) {
      addClasses(password, `Password is too short!`);
      e.target.dataset.valid = "null";
      validPassword = null;
      return;
    }
    if (passwordPattern.test(inputValue)) {
      addClasses(password, `Password cannot contain blank space!`);
      e.target.dataset.valid = "null";
      validPassword = null;
      return;
    }
    password.dataset.valid = "true";
    removeClasses(password);
  });
};

// validation signup form
export const validatedSignup = () => {
  //Signup Form
  const signupEmail = _id("signupEmail");
  const signupPassword = _id("signupPassword");
  const signupConfirmPassword = _id("signupConfirmPassword");
  const suggestionForm = _id("passwordSuggestion");
  const signUpBtn = _id("signUpBtn");
  const criteria = document.querySelectorAll(".passwordSuggestion__criteria");
  //Listening for variable changes
  if (!signupEmail) return;
  observer.observe(signupEmail, config);
  observer.observe(signupPassword, config);
  observer.observe(signupConfirmPassword, config);

  signupEmail.addEventListener("focusout", (e) => {
    let inputValue = e.target.value;
    if (inputValue.trim().length === 0 || inputValue.trim() === "") {
      addClasses(signupEmail, `Email cannot be empty!`);
      validSignupEmail = null;
      e.target.dataset.valid = "null";
      return;
    }
    if (!emailPattern.test(inputValue)) {
      addClasses(signupEmail, `Email is not valid!`);
      e.target.dataset.valid = "null";
      validSignupEmail = null;

      return;
    }
    signupEmail.dataset.valid = "true";
    removeClasses(signupEmail);
  });
  signupPassword.addEventListener("input", (e) => {
    showSuggestionForm(suggestionForm);
    checkPasswordStrength(e.target.value, criteria, signupPassword);
  });
  signupPassword.addEventListener("focusout", (e) => {
    removeSuggestionForm(suggestionForm);
  });
  signupConfirmPassword.addEventListener("focusout", (e) => {
    if (
      e.target.value !== signupPassword.value &&
      e.target.value.trim().length !== 0
    ) {
      addClasses(
        signupConfirmPassword,
        `Password and Password Confirm does not match!`
      );
      signupConfirmPassword.value = "";
      signupConfirmPassword.dataset.valid = "null";
      validsignupConfirmPassword = null;
      return;
    }
    if (
      e.target.value === signupPassword.value &&
      e.target.value.trim().length !== 0
    ) {
      signupConfirmPassword.dataset.valid = true;
      removeClasses(signupConfirmPassword);
    }
  });
  signupConfirmPassword.addEventListener("input", (e) => {
    if (e.target.value.trim().length === 0 || e.target.value.trim() === "") {
      addClasses(
        signupConfirmPassword,
        `Password and Password Confirm does not match!`
      );
      signupConfirmPassword.value = "";
      signupConfirmPassword.dataset.valid = "null";
      validsignupConfirmPassword = null;

      return;
    }
  });
};
const checkPasswordStrength = (password, criteria, signupPassword) => {
  const atLeastEight = new RegExp("(?=.{8,})");
  const oneUpperCaseChar = new RegExp("(?=.*[A-Z])");
  const oneLowerCaseChar = new RegExp("(?=.*[a-z])");
  const oneNumericChar = new RegExp("(?=.*[0-9])");
  const oneSpecialChar = new RegExp("(?=.*[!@#$%^&*])");
  const noBlankSpace = /^\S*$/;
  const conditions = [
    atLeastEight,
    oneUpperCaseChar,
    oneLowerCaseChar,
    oneNumericChar,
    oneSpecialChar,
    noBlankSpace,
  ];
  conditions.forEach((condition, index) => {
    if (!condition.test(password)) {
      criteria[index].children[0].classList.add("fa-times-circle");
      criteria[index].children[0].classList.remove("fa-check-circle");
      criteria[index].children[0].style.color = "red";
    } else {
      criteria[index].children[0].classList.remove("fa-times-circle");
      criteria[index].children[0].classList.add("fa-check-circle");
      criteria[index].children[0].style.color = "green";
    }
  });
  const satisfiedCriteria = document.querySelectorAll(".fa-check-circle");
  if (satisfiedCriteria.length === 6) {
    signupPassword.dataset.valid = true;
  } else {
    signupPassword.dataset.valid = "null";
    validSignupPassword = null;
  }
};
