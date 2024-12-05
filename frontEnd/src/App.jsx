import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { useAccessStatusContext } from "./context/accessStatus.context.jsx";

import Login from "./pages/login/login.jsx";
import Signup from "./pages/signup/signup.jsx";
import AddCredentials from "./pages/addCredentials/addCredentials.jsx";
import Vault from "./pages/vault/vault.jsx";
import toast from "react-hot-toast";

function ProtectedRoute({ accessStatus, children, redirectPath = "/login" }) {
  console.log(`Insdie protected route, the accessSTatus is ${accessStatus}`);
  if (!accessStatus) {
    toast.error("You are not authorized. Please Login!!");
    return <Navigate to={redirectPath} />;
  }
  return children;
}

function App() {
  const { accessStatus } = useAccessStatusContext();
  console.log(`accessStatus is ${accessStatus}`);


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to={accessStatus ? "/signup" : "/login"} />,
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
      element: (
        <ProtectedRoute accessStatus={accessStatus}>
          <AddCredentials />
        </ProtectedRoute>
      ),
    },
    {
      path: "/vault",
      element: (
        <ProtectedRoute accessStatus={accessStatus}>
          <Vault />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
