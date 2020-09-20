import elements from "./elements";
class Controller {
  static generateHtml(value, where = "category") {
    if (where === "category") {
      return `
       <a href="" class="main__categories-link active">${value}</a>
    `;
    } else if (where === "bookmark") {
      return `

         <div class="main__content-item">
           <h3 class="main__content-text">${value}</h3>
           <div class="main__link-containers">
            <i class="fa fa-pencil-square-o"></i>
            <i class="fa fa-trash-o"></i>
           </div> 
         </div>`;
    }
  }
  static insertCollection(value, where = "category") {
    if (where === "category")
      elements.categoryItem.innerHTML += generateHtml(value, where);
    else if (where === "bookmark")
      elements.contentItemContainer.innerHTML += generateHtml(value, where);
  }
  static displayLogin() {}
}
export default Controller;
