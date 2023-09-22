import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import RootLayout from "./pages/Root";
import Home from "./pages/Home";
import Login, { action as loginAction } from "./pages/Login";
import Signup, { action as signupAction } from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login />, action: loginAction },
      { path: "signup", element: <Signup />, action: signupAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
