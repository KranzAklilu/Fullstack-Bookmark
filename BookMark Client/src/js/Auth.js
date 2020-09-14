class Auth {
  static url = "http://localhost:5000/login";
  static dummyUser = {
    email: "1@1",
    password: "1",
  };
  static async login() {
    const response = await fetch(this.url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.dummyUser),
    });
    return response.json();
  }
  static setToken(token) {
    return localStorage.setItem("Token", token);
  }
  static getToken() {
    return localStorage.getItem("Token");
  }
}
export default Auth;
