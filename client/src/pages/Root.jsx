import { useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

import MainNavigation from "../components/Layout/MainNavigation";
import Backdrop from "../components/UI/Backdrop";
import ForgotPassword from "../components/UI/ForgotPasswordModal";
import Confirm from "../components/UI/ConfirmModal";

import Auth from "../utils/auth";

const RootLayout = () => {
  const token = useLoaderData();

  useEffect(() => {
    if (!token) {
      return;
    }

    let isExpired = Auth.isTokenExpired(token);

    if (isExpired) {
      return Auth.logout();
    }
  }, [token]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
        <Backdrop />
        <ForgotPassword />
        <Confirm />
      </main>
    </>
  );
};

export default RootLayout;
