import { useLoaderData, Link } from "react-router-dom";
import classes from "./VoyageList.module.css";

const VoyageList = () => {
  const voyages = useLoaderData();

  return (
    <div className={classes.voyageDiv}>
      <h2>Your Voyages:</h2>
      <ul className={classes.list}>
        {voyages.data.map((voyage) => {
          return (
            <Link to={`/api/log/${voyage.voyageId}`} key={voyage.voyageId}>
              <li className={classes.listItem}>{voyage.voyageName}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default VoyageList;
