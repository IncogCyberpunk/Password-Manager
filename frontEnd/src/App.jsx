import { useState } from "react";
import toast from "react-hot-toast"
import { createBrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";
import Introduction from "./components/Introduction";
import Background from "./components/Background";

function App({children}) {
 
  return (
    <>
      <Navbar />
      <main className="z-10">
        <Background>
          <Introduction />
            {children}
        </Background>
      </main>
    </>
  );
}

export default App;
 