import { useLoaderData } from "react-router-dom";
import classes from "./ViewLogData.module.css";

const ViewLogData = () => {
  const data = useLoaderData();
  const voyageData = data.data;

  return (
    <main>
      <h1>Log Data:</h1>
      {voyageData.length ? (
        <ul>
          {voyageData.map((data) => {
            return <li>{`${data.latitude}, ${data.longitude}`}</li>;
          })}
        </ul>
      ) : (
        <p>You have not created any wayponts yet.</p>
      )}
    </main>
  );
};

export default ViewLogData;
