// localStorage.clear();
import "babel-polyfill";
import { elements } from "./lib/elements";

const authRoute = "http://localhost:3000/auth/";
const userRoute = "http://localhost:3000/user/";

const state = {};
const categories = [];
state.category = categories;

const getUser = async function () {
  const jwt = JSON.parse(getToken());
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", jwt);
  const request = new Request(userRoute + "getUser", {
    method: "GET",
    headers,
  });
  const response = await fetch(request);
  return response.json();
};
const displayName = function () {
  const header = document.querySelector(".header__name");
  getUser().then((res) => {
    header.innerHTML = res.email;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  if (getToken()) {
    setToHeader();
    displayName();
  }
});
async function login(user) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const request = new Request(authRoute + "login", {
    method: "POST",
    headers,
    body: JSON.stringify(user),
  });

  const response = await fetch(request);
  if (response.ok) {
    const data = response.json();
    data.then(({ _id, token, expiresIn }) => {
      setToken(token);
      setToHeader();
      displayName();
    });
    return data;
  } else {
    const popup = document.createElement("p");
    popup.classList.add("form__popup");
    popup.innerHTML = "Email or Password Incorrect";
    elements.login.insertBefore(popup, elements.formHeaderLogin);
  }
}
async function changeUserState(currentUser) {
  const user = await login(currentUser);
  state.user = user;
  console.log(state.user._id);
}
elements.submitLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (getToken()) {
    return;
  }
  const user = {
    email: elements.loginEmail.value,
    password: elements.loginPassword.value,
  };
  changeUserState(user);
  // login(user).then(({ _id, token, expiresIn }) => {
  //   _id = _id;
  //   setToHeader();
  //   displayName();
  // });
});
elements.submitRegister.addEventListener("click", (e) => {
  e.preventDefault();
  const user = {
    email: elements.registerEmail.value,
    password: elements.registerPassword.value,
  };
  registerUser()
    .then((res) => {
      login(user)
        .then(({ _id, token, expiresIn }) => {
          _id = _id;
          setToken(token);
          setToHeader();
          displayName();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});
async function registerUser() {
  const user = {
    email: elements.registerEmail.value,
    password: elements.registerPassword.value,
  };
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const request = new Request(authRoute + "register", {
    method: "POST",
    headers,
    body: JSON.stringify(user),
  });
  const response = await fetch(request);
  console.log(response);
  if (response.ok) {
    return response.json();
  } else {
    const { msg, err } = await response.json();

    const popup = document.createElement("p");
    popup.classList.add("form__popup");
    popup.innerHTML = msg;
    elements.register.insertBefore(popup, elements.formHeaderRegister);

    console.log(err);
  }
}

elements.addCategory.addEventListener("keyup", (e) => {
  e.preventDefault();
  let value = e.target.value;
  if (e.key === "Enter") {
    insertCollection(value, "category");
    e.target.value = "";
  }
});
elements.bookmarkSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const value = {
    name: elements.bookmarkName.value,
    link: elements.bookmarkLink.value,
  };
  if (!value.name) {
    elements.bookmarkName.focus();
    elements.bookmarkName.classList.add("main__bookmark-name--focus");
    elements.bookmarkLink.classList.remove("main__bookmark-link--focus");
  } else if (!value.link) {
    elements.bookmarkLink.focus();
    elements.bookmarkLink.classList.add("main__bookmark-link--focus");
    elements.bookmarkName.classList.remove("main__bookmark-name--focus");
  } else {
    elements.bookmarkName.classList.remove("main__bookmark-name--focus");
    elements.bookmarkLink.classList.remove("main__bookmark-link--focus");
    insertCollection(value, "bookmark");
    elements.bookmarkName.value = "";
    elements.bookmarkLink.value = "";
  }
});
async function setToHeader() {
  const jwt = JSON.parse(getToken());

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", jwt);

  const request = new Request(authRoute + "protected", {
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
function generateHtml(value, where) {
  if (where === "category") {
    return `
       <a href="" class="main__categories-link active">${value}</a>
    `;
  } else if (where === "bookmark") {
    return `
         <div class="main__content-item">
           <div class="main__content-text-container">
            <h3 class="main__content-name">
              ${value.name}
            </h3>
            <p class="main__content-link">${value.link}</p>
           </div>
           <div class="main__link-containers">
            <i class="fa fa-pencil-square-o"></i>
            <i class="fa fa-trash-o"></i>
           </div> 
         </div>`;
  }
}
async function insertCollection(value, where) {
  if (where === "category") {
    const category = {
      name: value,
    };
    elements.categoryItem.innerHTML += generateHtml(value, where);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const request = new Request(userRoute + "create-category", {
      method: "POST",
      headers,
      body: JSON.stringify(category),
    });

    const response = await fetch(request);
    const data = await response.json();
    categories.push(data);
    console.log(state.category);
    return data;
  } else if (where === "bookmark") {
    elements.contentItemContainer.innerHTML += generateHtml(value, where);

    const bookmark = {
      name: value.name,
      link: value.link,
      user_id: state.user._id,
      // category_id: state.category._id,
    };
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const request = new Request(userRoute + "create-bookmark", {
      method: "POST",
      headers,
      // body: JSON.stringify(bookmark),
    });

    console.log(value);
    const response = await fetch(request);
    // return response.json();
  }
}
elements.loginLink.addEventListener("click", () => {
  elements.formLogin.style.display = "none";
  elements.formRegister.style.display = "block";
});
elements.registerLink.addEventListener("click", () => {
  elements.formRegister.style.display = "none";
  elements.formLogin.style.display = "block";
});

elements.categoryContainerItem.addEventListener("click", (e) => {
  e.preventDefault();
  const activeClass = "main__categories-link--active";

  const children = elements.categoryContainerItem.children;
  const arr = [...children];
  const active = arr.find((child) => child.classList.contains(activeClass));
  const child = arr.find((child) => e.target == child);
  state.category.name = child.innerHTML;
  if (e.target !== active && child) {
    active.classList.remove(activeClass);
    e.target.classList.add(activeClass);
  }
});

elements.edit.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    console.log(1);
    const containerDiv = e.target.parentElement.parentElement;
    const content = e.target.parentElement.previousElementSibling.innerHTML;
    console.log(content);

    elements.addBookmark.value = content;
    elements.addBookmark.focus();
    elements.contentItemContainer.removeChild(containerDiv);
  });
});

function setToken(token) {
  localStorage.setItem("jwt", JSON.stringify(token));
}
function getToken() {
  return localStorage.getItem("jwt");
}
function removeToken() {
  return localStorage.removeItem("jwt");
}
