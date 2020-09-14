import "babel-polyfill";
import Auth from "./Auth";
import Controller from "./lib/controller";
import elements from "./lib/elements";

// const app = new Auth();

// const token = Auth.login().then((data) => data);

elements.addCategory.addEventListener("keydown", (e) => {
  console.log(e);

  const value = e.target.value;
  console.log(1234);
  if (e.keyCode == 13) {
    value = "";
  }
  // Controller.insertCollection(value);
});
