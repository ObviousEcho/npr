import { useLoaderData } from "react-router-dom";
import classes from "./VoyageList.module.css";

const VoyageList = () => {
  const voyages = useLoaderData();

  return (
    <div className={classes.voyageDiv}>
      <h2>Your Voyages:</h2>
      <ul className={classes.list}>
        {voyages.data.map((voyage) => {
          return (
            <li className={classes.listItem}>
              {voyage.voyageId}, {voyage.voyageName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default VoyageList;
