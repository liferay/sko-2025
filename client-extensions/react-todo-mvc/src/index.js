import React from "react";
import {render, unmountComponentAtNode} from 'react-dom';
import { HashRouter, Route, Routes } from "react-router-dom";

import { App } from "./todo/app";
import "./todo/todo-app.css";
import "./todo/todo-base.css";

class WebComponent extends HTMLElement {
  connectedCallback() {
    render(<React.StrictMode>
      <HashRouter>
        <Routes>
            <Route path="*" element={<App />} />
        </Routes>
      </HashRouter>
    </React.StrictMode>, this);
  }

  disconnectedCallback() {
    unmountComponentAtNode(this);
  }
}

const ELEMENT_NAME = 'react-todo-mvc';

if (customElements.get(ELEMENT_NAME)) {
  // eslint-disable-next-line no-console
  console.log(`Skipping registration for <${ELEMENT_NAME}> (already registered)`);
} else {
  customElements.define(ELEMENT_NAME, WebComponent);
}