import elements from "./elements";
class Controller {
  static generateContentHtml(value) {
    return `
       <a href="" class="main__categories-link">${value}</a>
    `;
  }
  static insertCollection(value) {
    // console.log(value);
    elements.categoryContainer.innerHTML += `
       <a href="" class="main__categories-link">${value}</a>
    `;
    console.log(elements.categoryContainer);
  }
}
export default Controller;
