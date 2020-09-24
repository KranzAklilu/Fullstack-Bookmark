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
  name: query("header__name"),
  category: query("main__category"),
  categoryItem: query("main__category-item"),
  addCategory: query("main__add-collection"),
  main: query("main"),
  bookmarkName: query("main__bookmark-name"),
  bookmarkLink: query("main__bookmark-link"),
  bookmarkSubmit: query("main__bookmark-submit"),
  contentContainer: query("main__content"),
  contentItemContainer: query("main__content-item-container"),
  categoryContainerItem: query("main__category-item"),
  categoryBtn: query("main_btn"),
  categoryLink: queryAll("main__categories-link"),
  login: query("form__container-login"),
  register: query("form__container-register"),
  loginEmail: queryId("login-email"),
  loginPassword: queryId("login-password"),
  registerEmail: queryId("register-email"),
  registerPassword: queryId("register-password"),
  submitLogin: query("submit-login"),
  submitRegister: query("submit-register"),
  formSection: query("form"),
  form: query("form__container"),
  loginLink: query("login-link"),
  registerLink: query("register-link"),
  formHeaderLogin: query("form__header-login"),
  formHeaderRegister: query("form__header-register"),
  formLogin: query("form__login"),
  formRegister: query("form__register"),
};
export { elements };
