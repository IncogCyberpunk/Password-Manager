import { useState } from "react";
import Navbar from "./components/Navbar";
import Introduction from "./components/Introduction";
import Background from "./components/Background";
import monitorAccessJWT from "./utilities/monitorAccessJWT.js";
import Login from "./pages/login/login.jsx"
import Signup from "./pages/signup/signup.jsx"

function App() {

  monitorAccessJWT();
  return (
    <>
      <Navbar />
      <main className="z-10">
        <Background>
          <Introduction />
          <Signup/>
        </Background>
      </main>
    </>
  );
}

export default App;
 