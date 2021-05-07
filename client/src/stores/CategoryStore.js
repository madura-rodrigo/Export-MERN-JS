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

  updateCategory = async (e) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify(e);
    await axios
      .post("api/category/", body, config)
      .then((response) => {
        this.categories = this.categories.map((c) =>
          c._id === e._id ? response.data : c
        );
      })
      .catch((err) => {
        if (err.response) {
          this.rootStore.alertStore.addError(err.response.data.errors);
        }
      });
  };

  get categoryData() {
    return this.categories;
  }
}

export default CategoryStore;
