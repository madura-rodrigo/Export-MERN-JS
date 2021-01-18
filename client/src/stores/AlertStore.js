import { makeAutoObservable, observable } from "mobx";
import { v4 as uuid } from "uuid";

class AlertStore {
  alerts = observable.array();

  constructor(rootStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  addError = (errs) => {
    const id = uuid();
    errs !== null &&
      errs.length > 0 &&
      errs.map((err) =>
        this.alerts.push({ id: id, type: "error", msg: err.msg })
      );
  };

  clearError = (id) => {
    if (this.alerts !== null && this.alerts.length > 0)
      this.alerts = this.alerts.filter((alert) => alert.id !== id);
  };
}

export default AlertStore;
