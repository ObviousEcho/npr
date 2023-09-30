import { useParams } from "react-router-dom";

import DataActions from "../components/Layout/DataActions";
import ViewLogData from "../components/Layout/ViewLogData";
import classes from "./SingleVoyage.module.css";

const SingleVoyage = () => {
  const params = useParams();
  console.log(params.voyageId);

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
