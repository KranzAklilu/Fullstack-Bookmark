import { elements } from "./lib/elements";

class Auth {
  static getLoggedIn() {
    elements.login;
  }
  static async login() {
    const url = "http://localhost:3000/login";
    const user = {
      email: elements.emailInput.value,
      password: elements.passwordInput.value,
    };
    const headers = new Headers()
    headers.append("Accept", "application/json")
    headers.append("Content-Type", "application/json")

    const request = new Request(url, {
      method: "POST",
      mode: "cors",
      headers,
      body: JSON.stringify(user),
    })

    const response = await fetch(request);
    return response.json();
  }
  static setToken(token) {
    localStorage.setItem("jwt", JSON.stringify(token));
  }
  static getToken() {
    return localStorage.getItem("jwt");
  }
  static async setToHeader() {

    const url = 'http://localhost:3000/'
    const jwt = JSON.parse(this.getToken());

    const headers = new Headers()
    headers.append("Accept", "application/json")
    headers.append("Authentication", `Bearer ${jwt}`)

    const res = new Request(url, {
      method: "GET",
      mode: "cors",
      headers,
    })

    const response = await fetch(res)
    if (response.ok) {
      elements.formLogin.classList.remove("form__login--active")
      elements.form.style.display = "none"
      elements.main.classList.remove("main--active")
    }
  }
}
export default Auth;
