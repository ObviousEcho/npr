import { useLoaderData, Link } from "react-router-dom";
import classes from "./VoyageList.module.css";

const VoyageList = () => {
  const voyages = useLoaderData();

  return (
    <main className={classes.voyageDiv}>
      <h2>Your Voyages:</h2>
      <ul className={classes.list}>
        {voyages.data.map((voyage) => {
          return (
            <Link to={`/log/${voyage.voyageId}`} key={voyage.voyageId}>
              <li className={classes.listItem}>{voyage.voyageName}</li>
            </Link>
          );
        })}
      </ul>
    </main>
  );
};

export default VoyageList;
