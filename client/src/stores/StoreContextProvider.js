import React from "react";
import { createContext } from "react";
import RootStore from "./RootStore";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {
  return (
    <StoreContext.Provider value={new RootStore()}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
