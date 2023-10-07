import { useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

import MainNavigation from "../components/Layout/MainNavigation";
import ForgotPassword from "../components/UI/ForgotPasswordModal";
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
        <ForgotPassword />
      </main>
    </>
  );
};

export default RootLayout;
