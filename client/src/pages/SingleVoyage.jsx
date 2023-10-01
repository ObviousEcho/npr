import { redirect } from "react-router-dom";

import DataActions from "../components/Layout/DataActions";
import ViewLogData from "../components/Layout/ViewLogData";
import classes from "./SingleVoyage.module.css";
import Auth from "../utils/auth";

const SingleVoyage = () => {
  return (
    <>
      <main className={classes.logData}>
        <ViewLogData />
      </main>
      <footer className={classes.footer}>
        <DataActions />
      </footer>
    </>
  );
};

export default SingleVoyage;

export async function loader({ params }) {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return redirect("/login");
  }

  const response = await fetch(`/api/log/${params.voyageId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
