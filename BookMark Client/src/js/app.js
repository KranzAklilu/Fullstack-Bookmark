// localStorage.clear();
import "babel-polyfill";
import { elements } from "./lib/elements";

const baseUrl = "http://localhost:3000/";
const getUser = async function () {
  const jwt = JSON.parse(getToken());
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", jwt);
  const request = new Request(baseUrl + "getUser", {
    method: "GET",
    headers,
  });
  const response = await fetch(request);
  return response.json();
};
const displayName = function () {
  const header = document.querySelector(".header__header");
  getUser().then((res) => {
    header.innerHTML = res.email;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  if (getToken()) {
    setToHeader();
    displayName();
  } else {
  }
});

elements.addCategory.addEventListener("keyup", (e) => {
  let value = e.target.value;
  if (e.key === "Enter") {
    insertCollection(value, "category");
    e.target.value = "";
  }
});

elements.addBookmark.addEventListener("keyup", (e) => {
  let value = e.target.value;
  if (e.key === "Enter") {
    insertCollection(value, "bookmark");
    e.target.value = "";
  }
});
elements.submitLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (getToken()) {
    return;
  }
  const user = {
    email: elements.loginEmail.value,
    password: elements.loginPassword.value,
  };
  generateToken(user).then(({ _id, token, expiresIn }) => {
    _id = _id;
    setToken(token);
    setToHeader();
    displayName();
  });
});
elements.submitRegister.addEventListener("click", (e) => {
  e.preventDefault();
  const user = {
    email: elements.registerEmail.value,
    password: elements.registerPassword.value,
  };
  registerUser().then((res) => {
    if (res) {
      console.log("asd");
      generateToken(user).then((res) => console.log(res));
      console.log(user);
    }
    console.log(res);
  });
});
async function registerUser() {
  const user = {
    email: elements.registerEmail.value,
    password: elements.registerPassword.value,
  };
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const request = new Request(baseUrl + "register", {
    method: "POST",
    headers,
    body: JSON.stringify(user),
  });
  const response = await fetch(request);
  return response.json();
}
async function generateToken(user) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const request = new Request(baseUrl + "login", {
    method: "POST",
    headers,
    body: JSON.stringify(user),
  });

  const response = await fetch(request);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const popup = document.createElement("p");
    popup.classList.add("form__popup");
    popup.innerHTML = "Email or Password Incorrect";
    elements.form.insertBefore(popup, elements.formHeader);
  }
}
function setToken(token) {
  localStorage.setItem("jwt", JSON.stringify(token));
}
function getToken() {
  return localStorage.getItem("jwt");
}
function removeToken() {
  return localStorage.removeItem("jwt");
}

async function setToHeader() {
  const jwt = JSON.parse(getToken());

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", jwt);

  const request = new Request(baseUrl + "protected", {
    method: "GET",
    headers,
  });
  const response = await fetch(request);
  try {
    if (response.ok) {
      elements.formLogin.classList.remove("form__login--active");
      elements.formSection.style.display = "none";
      elements.main.classList.remove("main--active");
    } else {
      response.json({ msg: "JWT is Invalid or Expired" });
    }
  } catch (err) {
    console.error(err);
  }
}
function generateHtml(value, where = "category") {
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
function insertCollection(value, where = "category") {
  if (where === "category")
    elements.categoryItem.innerHTML += generateHtml(value, where);
  else if (where === "bookmark")
    elements.contentItemContainer.innerHTML += generateHtml(value, where);
}
elements.loginLink.addEventListener("click", (e) => {
  elements.formLogin.style.display = "none";
  elements.formRegister.style.display = "block";
});
elements.registerLink.addEventListener("click", (e) => {
  elements.formRegister.style.display = "none";
  elements.formLogin.style.display = "block";
});
