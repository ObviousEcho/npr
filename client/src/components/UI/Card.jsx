import classes from "./Card.module.css";

const Card = ({
  voyageName,
  logDate,
  time,
  latitude,
  longitude,
  heading,
  notes,
}) => {
  const [date] = logDate.split("T");
  const [logTime] = time.split(":00");

  let headingDeg;
  if (heading.toString().length === 1) {
    headingDeg = `00${heading}\u00B0`;
  } else if (heading.toString().length === 2) {
    headingDeg = `0${heading}\u00B0`;
  } else {
    headingDeg = `${heading}\u00B0`;
  }

  return (
    <section className={classes.card}>
      <div className={classes.data}>
        <div className={classes.dateField}>
          <p className={classes.date}>{date}</p>
          <p className={classes.time}>Time: {logTime}</p>
        </div>
        <p className={classes.log}>
          Latitude: {latitude}
          <br />
          Longitude: {longitude}
          <br />
          Course: {headingDeg}
        </p>
      </div>
      <div className={classes.notes}>
        <h6>Notes:</h6>
        <p>{notes}</p>
      </div>
    </section>
  );
};

export default Card;
