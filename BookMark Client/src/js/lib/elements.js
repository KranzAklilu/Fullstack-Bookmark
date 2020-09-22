const query = function (elem) {
  return document.querySelector(`.${elem}`);
};
const queryAll = function (elem) {
  return document.querySelectorAll(`.${elem}`);
};
const queryId = function (elem) {
  return document.querySelector(`#${elem}`);
};
const elements = {
  edit: queryAll("fa-pencil-square-o"),
  trash: queryAll("fa-trash-o"),
  category: query("main__category"),
  categoryItem: query("main__category-item"),
  addCategory: query("main__add-collection"),
  main: query("main"),
  addBookmark: query("main__add-bookmark"),
  contentContainer: query("main__content"),
  contentItemContainer: query("main__content-item-container"),
  categoryContainerItem: query("main__category-item"),
  categoryBtn: query("main_btn"),
  categoryLink: queryAll("main__categories-link"),
  loginEmail: queryId("login-email"),
  loginPassword: queryId("login-password"),
  registerEmail: queryId("register-email"),
  registerPassword: queryId("register-password"),
  submitLogin: query("submit-login"),
  submitRegister: query("submit-register"),
  register: query("register"),
  formSection: query("form"),
  form: query("form__form"),
  loginLink: query("login-link"),
  registerLink: query("register-link"),
  formHeader: query("form__header"),
  formLogin: query("form__login"),
  formRegister: query("form__register"),
};
export { elements };
