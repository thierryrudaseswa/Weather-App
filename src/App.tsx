import React from "react";
import "./index.css";
import './App.css'

import Home from "./Home/Home";
import { useStore } from "./store";
import { useQuery } from "@tanstack/react-query";
function App() {
  return (
    <div className=" home max-w-screen m-auto p-3 h-full">
      <Home />
    </div>
  );
}

export default App;
