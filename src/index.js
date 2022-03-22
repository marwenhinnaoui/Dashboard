import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import {createStore} from 'redux'
// import reducer from "./components/reducer/reducer";
// import {Provider} from 'react-redux'

ReactDOM.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>
    ,

  document.getElementById("root"),
);
