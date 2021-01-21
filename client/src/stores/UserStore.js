import axios from "axios";
import { makeAutoObservable } from "mobx";

class UserStore {
  user = {
    token: localStorage.getItem("token"),
    isAuthenticated: localStorage.getItem("token") ? true : false,
    user: {
      firstName: localStorage.name,
      avatar: localStorage.avatar,
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
        this.user.isAuthenticated = true;
        this.loadUser();
      })
      .catch((err) => {
        localStorage.setItem("token", null);
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
          this.user.isAuthenticated = true;
          this.setAuthToken(localStorage.token);
        })
        .catch((err) => {
          if (err.response) {
            this.rootStore.alertStore.addError(err.response.data.errors);
          }
        });
    } catch (err) {
      this.user.isAuthenticated = false;
      this.rootStore.alertStore.addError([{ msg: err.message }]);
    }
  };

  loadUser = async () => {
    if (localStorage.token) {
      this.setAuthToken(localStorage.token);
    }
    await axios
      .get("api/profile/me")
      .then((response) => {
        this.user.user = response.data;
        localStorage.setItem("name", this.user.user.firstName);
        localStorage.setItem("avatar", this.user.user.avatar);
      })
      .catch((err) => {
        if (err.response) {
          this.rootStore.alertStore.addError(err.response.data.errors);
        }
      });
  };

  updateUser = async () => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify(this.user.user);
    await axios
      .put("api/profile/me", body, config)
      .then((response) => {
        this.user.user = response.data;
        localStorage.setItem("name", this.user.user.firstName);
        localStorage.setItem("avatar", this.user.user.avatar);
      })
      .catch((err) => {
        if (err.response) {
          this.rootStore.alertStore.addError(err.response.data.errors);
        }
      });
  };

  logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("avatar");
    this.user.isAuthenticated = false;
    this.setAuthToken(localStorage.token);
  };

  setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
    } else {
      delete axios.defaults.headers.common["x-auth-token"];
    }
  };

  get name() {
    return this.user.user.firstName;
  }

  get avatar() {
    return this.user.user.avatar;
  }
}

export default UserStore;
