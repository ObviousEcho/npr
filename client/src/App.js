import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import RootLayout from "./pages/Root";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      // {path: "login", element: <Login />},
      // {path: "signup", element: <Signup />}
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
