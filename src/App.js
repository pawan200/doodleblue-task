import React from "react";
import "./App.css";
import Contact from "./containers/Contact/Contact";
import SideDrawer from "../src/components/SideDrawer/SideDrawer";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <SideDrawer />
        <Contact />
      </GlobalProvider>
    </div>
  );
}

export default App;
