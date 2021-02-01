import AlertStore from "./AlertStore";
import UserStore from "./UserStore";
import CategoryStore from "./CategoryStore";

class RootStore {
  constructor() {
    this.userStore = new UserStore(this);
    this.alertStore = new AlertStore(this);
    this.categoryStore = new CategoryStore(this);
  }
}

export default RootStore;
