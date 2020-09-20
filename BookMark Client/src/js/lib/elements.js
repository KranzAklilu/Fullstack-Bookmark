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
  edit: query("edit"),
  trash: query("trash"),
  category: query("main__category"),
  categoryItem: query("main__category-item"),
  addCategory: query("main__add-collection"),
  main: query("main"),
  addBookmark: query("main__add-bookmark"),
  contentContainer: query("main__content"),
  contentItemContainer: query("main__content-item-container"),
  categoryContainer: query("main__category"),
  categoryBtn: query("main_btn"),
  categoryLink: queryAll("main__categories-link"),
  emailInput: queryId("input-email"),
  passwordInput: queryId("input-password"),
  submit: query("form__btn"),
  register: query("register"),
  form: query("form"),
  formLogin: query("form__login"),
  formRegister: query("form__login"),
};
export { elements };
