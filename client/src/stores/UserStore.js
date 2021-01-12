import axios from "axios";
import { makeAutoObservable } from "mobx";

class UserStore {
  user = {
    token: localStorage.getItem("token"),
    loading: true,
    user: {
      firstName: String,
      lastName: String,
      email: String,
      country: String,
      area: String,
      address: String,
      phone: String,
      postalCode: String,
    },
  };

  constructor(rootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  authUser = async (e) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify(e);
    await axios
      .post("api/auth", body, config)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        this.user.loading = false;
        this.user.isAuthenticated = true;
      })
      .catch((err) => {
        localStorage.setItem("token", null);
        this.user.loading = true;
        this.user.isAuthenticated = false;
        this.rootStore.alertStore.addError(err.response.data.errors);
      });
  };

  registerUser = async (e) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    try {
      this.user.user = e;

      const { password, password2 } = e;
      if (password !== password2) {
        throw new Error("Passwords do not match.");
      }
      const body = JSON.stringify(e);
      await axios
        .post("api/profile", body, config)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          this.user.loading = false;
          this.user.isAuthenticated = true;
        })
        .catch((err) => {
          if (err.response) {
            this.rootStore.alertStore.addError(err.response.data.errors);
          }
        });
    } catch (err) {
      this.user.loading = true;
      this.user.isAuthenticated = false;
      this.rootStore.alertStore.addError([{ msg: err.message }]);
    }
  };

  setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
    } else {
      delete axios.defaults.headers.common["x-auth-token"];
    }
  };

  logout = () => {
    localStorage.setItem("token", null);
    this.user.loading = true;
    this.user.isAuthenticated = false;
  };
}

export default UserStore;
