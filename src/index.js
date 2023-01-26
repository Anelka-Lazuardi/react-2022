import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Userprovider } from "./contexts/user.context";
import "./index.scss";

const rootElement = document.getElementById("root");

render(
  <React.StrictMode>
    <BrowserRouter>
      <Userprovider>
        <App />
      </Userprovider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
