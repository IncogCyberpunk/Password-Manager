import { useState } from "react";
import Navbar from "./components/Navbar";
import Introduction from "./components/Introduction";
import Background from "./components/Background";
import monitorAccessJWT from "./utilities/monitorAccessJWT.js";

function App() {

  monitorAccessJWT();
  return (
    <>
      <Navbar />
      <main className="z-10">
        <Background>
          <Introduction />
        </Background>
      </main>
    </>
  );
}

export default App;
