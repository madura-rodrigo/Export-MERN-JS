import axios from "axios";
import { makeAutoObservable, observable } from "mobx";
import { v4 as uuid } from "uuid";

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
    // showSellerOption: false,
    // isAuthenticated: false,
    errors: [],
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
      this.addError(err.response.data.errors);
    }
  };

  registerUser = async (e) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    try {
      this.user.user = e;

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
      this.addError(err.response.data.errors);
    }
  };

  // isSellerOptionVisible = () => {
  //   return this.user.showSellerOption;
  // };
  // setSellerOptionVisible = () => {
  //   if (this.user.user.country === "SL") {
  //     this.user.showSellerOption = true;
  //   }
  // };

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

  addError = (errs) => {
    const id = uuid();
    errs !== null &&
      errs.length > 0 &&
      errs.map((err) =>
        this.user.errors.push({ id: id, type: "danger", msg: err.msg })
      );
  };

  clearError = (id) => {
    if (this.user.errors !== null && this.user.errors.length > 0)
      this.user.errors = this.user.errors.filter((err) => err.id !== id);
  };
}

export default UserStore;
