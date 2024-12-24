import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useAccessStatusContext } from "./context/accessStatus.context.jsx";

import Login from "./pages/login/login.jsx";
import Signup from "./pages/signup/signup.jsx";
import AddCredentials from "./pages/addCredentials/addCredentials.jsx";
import Vault from "./pages/vault/vault.jsx";
import toast from "react-hot-toast";
import Globe from "./components/Globe.jsx";


// function ProtectedRoute({ accessStatus, children, redirectPath = "/login" }) {
//   console.log(`Insdie protected route, the accessSTatus is ${accessStatus}`);
//   if (!accessStatus) {
//     toast.error("You are not authorized. Please Login!!");
//     return <Navigate to={redirectPath} />;
//   }
//   return children;
// }




function App() {
  const { accessStatus } = useAccessStatusContext();


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" />
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/addcredentials",
      // element: (
      //   <ProtectedRoute accessStatus={accessStatus}>
      //     <AddCredentials />
      //   </ProtectedRoute>
      // ),
      element: (
        accessStatus ? <AddCredentials /> : <Navigate to="/login" />
      ),
    },
    {
      path: "/vault",
      // element: (
      //   <ProtectedRoute accessStatus={accessStatus}>
      //     <Vault />
      //   </ProtectedRoute>
    // ),
      element: (
        accessStatus ? <Vault /> : <Navigate to="/login" />
      ),

      path:"/globe",
      element: <Globe /> 
},
  ]);

return <RouterProvider router={router} />;
}


function ProtectedRoute(accessStatus) {
  console.log(`Insdie protected route, the accessSTatus is ${accessStatus}`);
  if (!accessStatus) {
    toast.error("You are not authorized. Please Login!!");
    return false;
  }
  else {
    return true
  }
}

export default App;
