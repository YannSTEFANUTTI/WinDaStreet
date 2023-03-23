import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import GameModeProvider from "./contexts/GameModeContext";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <GameModeProvider>
      <App />
    </GameModeProvider>
  </BrowserRouter>
);
