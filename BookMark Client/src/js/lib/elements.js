const query = function (elem) {
  return document.querySelector(`.${elem}`);
};
const queryAll = function (elem) {
  return document.querySelectorAll(`.${elem}`);
};
const elements = {
  edit: query("edit"),
  trash: query("trash"),
  catagory: query("main_categories"),
  addCategory: query("main__add-collection"),
  addBookmark: query("addBookmark"),
  contentContainer: query("main__content"),
  contentItem: query("main__content-item"),
  categoryContainer: query("main__category"),
  categoryBtn: query("main_btn"),
  categoryLink:queryAll("main__categories-link")
};
export default elements;
