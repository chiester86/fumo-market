import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import FumoStore from "./store/FumoStore";
import UserStore from "./store/UserStore";
import CartStoreStore from "./store/CartStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      fumo: new FumoStore(),
      cart: new CartStoreStore(),
    }}
  >
    <App />
  </Context.Provider>
);

export default App;
