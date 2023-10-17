import {
  useLoaderData,
  Form,
  useParams,
  useActionData,
  useNavigation,
} from "react-router-dom";

import Button from "../UI/Button";
import classes from "./UpdateLogForm.module.css";

const UpdateLogForm = () => {
  const loaderData = useLoaderData();
  // const data = useActionData();
  const params = useParams();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const { logDate, time, latitude, longitude, heading, notes } =
    loaderData.data[0];
  const date = logDate.split("T")[0];

  const [deg, latMin, latDir] = latitude.split(" ");
  let latDeg = deg.split("\u00B0")[0];
  const degrees = "\u00B0";
  if (latDeg.length === 1) {
    latDeg = `00${latDeg}`;
  } else if (latDeg.length === 2) {
    latDeg = `0${latDeg}`;
  }

  const [lDeg, longMin, longDir] = longitude.split(" ");
  let longDeg = lDeg.split("\u00B0")[0];
  if (longDeg.length === 1) {
    longDeg = `00${longDeg}`;
  } else if (longDeg.length === 2) {
    longDeg = `0${longDeg}`;
  }

  return (
    <>
      <div className={classes.divForm}>
        <h1 className={classes.heading}>Update Log Entry</h1>
        <hr />
        <Form
          method="post"
          action={`/update-log/${params.logId}`}
          className={classes.form}
        >
          <label className={classes.label}>Date</label>
          <br />
          <input
            className={classes.input}
            name="logDate"
            value={date}
            type="date"
            required
          />
          <br />
          <label className={classes.label}>Time</label>
          <br />
          <input
            className={classes.input}
            name="voyageTime"
            value={time}
            type="time"
            required
          />
          <br />
          <label className={classes.label}>Latitude</label>
          <div className={classes.coordinates}>
            <div className={classes.coord}>
              <label className={classes.coordLabel}>{`Deg${degrees}`}</label>
              <br />
              <input
                className={classes.coordInput}
                name="latDeg"
                value={latDeg}
                type="number"
                min="0"
                max="90"
                required
              />
            </div>
            <div className={classes.coord}>
              <label className={classes.coordLabel}>Min</label>
              <br />
              <input
                className={classes.coordInput}
                name="latMin"
                value={latMin}
                type="text"
                maxLength="7"
                required
              />
            </div>
            <div className={classes.coord}>
              <label className={classes.coordLabel}>N/S</label>
              <br />
              <input
                className={classes.coordInput}
                name="latDir"
                value={latDir}
                type="text"
                minLength="1"
                maxLength="1"
                required
              />
            </div>
          </div>

          <label className={classes.label}>Longitude</label>
          <div className={classes.coordinates}>
            <div className={classes.coord}>
              <label className={classes.coordLabel}>{`Deg${degrees}`}</label>
              <br />
              <input
                className={classes.coordInput}
                name="longDeg"
                value={longDeg}
                type="number"
                min="0"
                max="180"
                required
              />
            </div>
            <div className={classes.coord}>
              <label className={classes.coordLabel}>Min</label>
              <br />
              <input
                className={classes.coordInput}
                name="longMin"
                value={longMin}
                type="text"
                maxLength="7"
                required
              />
            </div>
            <div className={classes.coord}>
              <label className={classes.coordLabel}>E/W</label>
              <br />
              <input
                className={classes.coordInput}
                name="longDir"
                value={longDir}
                type="text"
                minLength="1"
                maxLength="1"
                required
              />
            </div>
          </div>

          <label className={classes.label}>{`Heading${degrees}`}</label>
          <br />
          <input
            className={classes.input}
            name="voyageHeading"
            value={heading}
            type="number"
            min="0"
            max="360"
            required
          />
          <br />
          <label className={classes.label}>Notes</label>
          <br />
          <input
            className={classes.input}
            name="voyageNotes"
            value={notes}
            type="text"
          />
          <br />
          <div className={classes.buttonDiv}>
            <Button
              type="button"
              disabled={isSubmitting}
              buttonName={isSubmitting ? "...Submititting" : "Submit"}
            />
          </div>
        </Form>
        {/* {data && data.message && <p>{data.message}</p>} */}
      </div>
    </>
  );
};

export default UpdateLogForm;
