import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StoreProvider } from "./store/store";
import { initialState, userReducer } from "./store/reducers/userReducer";
// import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <StoreProvider initialState={initialState} reducer={userReducer}>
    <App />
  </StoreProvider>,
  document.getElementById("root")
);

// reportWebVitals();
