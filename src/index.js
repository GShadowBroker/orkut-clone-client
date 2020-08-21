import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./services/client";

import WindowDimensionsProvider from "./components/ResponsiveLayout/WindowDimensionsProvider";

ReactDOM.render(
  <ApolloProvider client={client}>
    <WindowDimensionsProvider>
      <Router>
        <App />
      </Router>
    </WindowDimensionsProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
