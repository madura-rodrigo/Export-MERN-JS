import axios from "axios";
import { makeAutoObservable } from "mobx";

class Store {
  user = {
    token: localStorage.getItem("token"),
    loading: true,
    user: "",
    isAuthenticated: false,
    error: {
      type: null,
      msg: null,
    },
  };

  constructor() {
    makeAutoObservable(this);
  }

  authUser = async (e) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    try {
      const body = JSON.stringify(e);
      const res = await axios.post("api/auth", body, config);
      localStorage.setItem("token", res.data.token);
      this.user.loading = false;
      this.user.isAuthenticated = true;
      console.log(res.data);
    } catch (err) {
      localStorage.setItem("token", null);
      this.user.loading = true;
      this.user.isAuthenticated = false;
      this.user.error = err.response.data;
      console.error(err.response.data);
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

export default Store;
