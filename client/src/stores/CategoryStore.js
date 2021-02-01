import axios from "axios";
import { makeObservable, observable, action, computed } from "mobx";

class CategoryStore {
  categories = [];
  constructor(rootStore) {
    makeObservable(this, {
      categories: observable,
      load: action,
      categoryData: computed,
    });
    this.rootStore = rootStore;
  }

  load = async () => {
    await axios
      .get("api/category")
      .then((response) => {
        this.categories = response.data;
      })
      .catch((err) => {
        this.rootStore.alertStore.addError(err.response.data.errors);
      });
  };

  get categoryData() {
    return this.categories;
  }
}

export default CategoryStore;
