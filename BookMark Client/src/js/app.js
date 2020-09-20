import "babel-polyfill";
import Auth from "./Auth";
import Controller from "./lib/controller";
import { elements } from "./lib/elements";

document.addEventListener("DOMContentLoaded", () => {
  if (Auth.getToken) {
    Auth.setToHeader()
  }
})

elements.addCategory.addEventListener("keyup", (e) => {
  let value = e.target.value;
  if (e.key === "Enter") {
    Controller.insertCollection(value, "category");
    e.target.value = "";
  }
});
elements.addBookmark.addEventListener("keyup", (e) => {
  let value = e.target.value;
  if (e.key === "Enter") {
    Controller.insertCollection(value, "bookmark");
    e.target.value = "";
  }
});
elements.submit.addEventListener("click", (e) => {
  e.preventDefault();
  Auth.login().then(res => {
    const { _id, token, expiresIn } = res;

    return { _id, token, expiresIn }
  }).then(data => {
    if (!data.token) throw new Error("Bad Request")
    Auth.setToken(data.token)
    Auth.setToHeader()
  }).catch(err => console.log(err.message))
});
