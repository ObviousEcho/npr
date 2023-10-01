import { useLoaderData } from "react-router-dom";

import Card from "../UI/Card";
import classes from "./ViewLogData.module.css";

const ViewLogData = () => {
  const data = useLoaderData();
  const voyageData = data.data;

  return (
    <main>
      <h1 className={classes.heading}>{voyageData[0].voyageName}</h1>
      <hr />
      {voyageData.length ? (
        <div className={classes.list}>
          {voyageData.map((data) => {
            return (
              <Card
                className={classes.listItem}
                key={data.voyageId}
                voyageName={data.voyageName}
                logDate={data.logDate}
                time={data.time}
                latitude={data.latitude}
                longitude={data.longitude}
                heading={data.heading}
                notes={data.notes}
              />
            );
          })}
        </div>
      ) : (
        <p>You have not created any wayponts yet.</p>
      )}
    </main>
  );
};

export default ViewLogData;
