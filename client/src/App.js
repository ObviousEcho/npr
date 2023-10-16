import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login, { action as loginAction } from "./pages/Login";
import Signup, { action as signupAction } from "./pages/Signup";
import Voyages, {
  action as addVoyageAction,
  loader as loadVoyages,
} from "./pages/Voyages";
import SingleVoyage, { loader as loadData } from "./pages/SingleVoyage";
import AddData, { action as addLogAction } from "./pages/AddData";
import Chart from "./pages/Chart";
import UpdateLog, { loader as loadLog } from "./pages/UpdateLog";
import PasswordReset, {
  action as resetPasswordAction,
} from "./pages/PasswordReset";
import Auth from "./utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    errorElement: <ErrorPage />,
    loader: Auth.getToken,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login />, action: loginAction },
      { path: "signup", element: <Signup />, action: signupAction },
      {
        path: "voyages",
        element: <Voyages />,
        action: addVoyageAction,
        loader: loadVoyages,
      },
      {
        path: "log/:voyageId",
        element: <SingleVoyage />,
        loader: loadData,
      },
      {
        path: "log/add-data/:voyageId",
        element: <AddData />,
        action: addLogAction,
      },
      { path: "chart/:voyageId", element: <Chart /> },
      {
        path: "password-reset",
        element: <PasswordReset />,
        action: resetPasswordAction,
      },
      { path: "update-log/:logId", element: <UpdateLog />, loader: loadLog },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
