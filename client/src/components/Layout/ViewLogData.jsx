import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import LogLinks from "./LogLinks";
import Card from "../UI/Card";
import classes from "./ViewLogData.module.css";

const svgPath = [
  "/images/anchor.svg",
  "/images/anchor-2.svg",
  "/images/bowline.svg",
  "/images/card.svg",
  "/images/compass.svg",
  "/images/compass-2.svg",
  "/images/crossbones.svg",
  "/images/figure-eight.svg",
  "/images/globe.svg",
  "/images/lifebelt.svg",
  "/images/lighthouse.svg",
  "/images/lighthouse-2.svg",
  "/images/map.svg",
  "/images/pirate-ship.svg",
  "/images/polar.svg",
  "/images/sailing.svg",
  "/images/sailing-ship.svg",
  "/images/ship.svg",
  "/images/skull.svg",
  "/images/square.svg",
  "/images/square-knot.svg",
  "/images/steering.svg",
  "/images/spyglass.svg",
  "/images/wheel.svg",
  "/images/wind.svg",
];

const ViewLogData = () => {
  const data = useLoaderData();
  const voyageData = data.res.data.toReversed();

  const [logId, setLogId] = useState("");

  const voyageName = data.res.response[0].voyageName;

  useEffect(() => {
    if (voyageData.length) {
      setLogId(voyageData[0].logId);
    }
  }, [voyageData]);

  return (
    <main>
      <h1 className={classes.heading}>{voyageName}</h1>
      <hr />
      <LogLinks voyage={voyageName} />
      {voyageData.length ? (
        <div className={classes.list}>
          {voyageData.map((data) => {
            const svg = svgPath[Math.floor(Math.random() * svgPath.length)];
            return (
              <Card
                className={classes.listItem}
                key={logId}
                voyageName={data.voyageName}
                logId={logId}
                logDate={data.logDate}
                time={data.time}
                latitude={data.latitude}
                longitude={data.longitude}
                heading={data.heading}
                notes={data.notes}
                svg={svg}
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
