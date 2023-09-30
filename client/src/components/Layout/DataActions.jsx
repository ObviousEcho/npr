import { Link, useParams } from "react-router-dom";

import Button from "../UI/Button";
import classes from "./DataActions.module.css";

const DataActions = () => {
  const params = useParams();

  return (
    <>
      <hr />
      <div className={classes.buttonDiv}>
        <Link to={`/log/add-data/${params.voyageId}`}>
          <Button buttonName={"Add Log Data"} />
        </Link>
        <Link to={`/chart/${params.voyageId}`}>
          <Button buttonName={"View Chart"} />
        </Link>
      </div>
    </>
  );
};

export default DataActions;
