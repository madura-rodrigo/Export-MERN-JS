import AlertStore from "./AlertStore";
import UserStore from "./UserStore";

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.alertStore = new AlertStore(this);
  }
}

export default RootStore;
