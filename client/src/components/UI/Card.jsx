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
      <div className={classes.dateTime}>
        <p className={classes.dateField}>
          {date}
          <br />
          {logTime}
        </p>
      </div>
      <div>
        <p>Latitude: {latitude}</p>
        <p>Longitude: {longitude}</p>
        <p>Course: {headingDeg}</p>
        <p>Notes: {notes}</p>
      </div>
    </section>
  );
};

export default Card;
