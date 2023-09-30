import { useLoaderData, Link } from "react-router-dom";
import classes from "./VoyageList.module.css";

const VoyageList = () => {
  const data = useLoaderData();
  const voyages = data.data.toReversed();

  return (
    <main className={classes.voyageDiv}>
      <h2>Your Voyages:</h2>
      {voyages.length ? (
        <ul className={classes.list}>
          {voyages.map((voyage) => {
            return (
              <Link to={`/log/${voyage.voyageId}`} key={voyage.voyageId}>
                <li className={classes.listItem}>{voyage.voyageName}</li>
              </Link>
            );
          })}
        </ul>
      ) : (
        <p>You haven't created any voyages yet.</p>
      )}
    </main>
  );
};

export default VoyageList;
