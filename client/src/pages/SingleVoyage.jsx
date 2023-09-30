import { useParams, redirect } from "react-router-dom";

import DataActions from "../components/Layout/DataActions";
import ViewLogData from "../components/Layout/ViewLogData";
import classes from "./SingleVoyage.module.css";
import Auth from "../utils/auth";

let voyageId = "";

const closure = (param) => {
  voyageId = param;
};

const SingleVoyage = () => {
  const params = useParams();
  closure(params.voyageId);

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

export async function loader() {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return redirect("/login");
  }

  const response = await fetch(`/api/log/${voyageId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
