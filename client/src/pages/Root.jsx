import { useEffect } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

import MainNavigation from "../components/Layout/MainNavigation";
import Auth from "../utils/auth";

const RootLayout = () => {
  const token = useLoaderData();

  useEffect(() => {
    if (!token) {
      return;
    }

    let isExpired = Auth.isTokenExpired(token);
    console.log(isExpired);

    if (isExpired) {
      return Auth.logout();
    }
  }, [token]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
