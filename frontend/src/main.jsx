import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";

import App from "./App";
import store from "./store/store.js";
import { restoreUser } from "./store/userSlice";

import "./index.css";


function RestoreUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        const user = JSON.parse(userData);
          // console.log("PARSED USER:", user);
        dispatch(restoreUser(user));
          // console.log("RESTORE USER DISPATCHED");
      } catch (error) {
        console.log("ERROR:", error);
      }
    }
  }, [dispatch]);

  return <App />;
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <RestoreUser />
    </Provider>
  </BrowserRouter>
);