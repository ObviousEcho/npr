import { redirect } from "react-router-dom";

import ViewLogData from "../components/Layout/ViewLogData";
import classes from "./SingleVoyage.module.css";
import Auth from "../utils/auth";

const SingleVoyage = () => {
  return (
    <>
      <main className={classes.logData}>
        <ViewLogData />
      </main>
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

  if (!response.ok) {
    throw new Response({ message: "Unable to fetch data" }, { status: 500 });
  }

  return response;
}
