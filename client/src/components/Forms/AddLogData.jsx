import { Form, useActionData, useNavigation } from "react-router-dom";

import Button from "../UI/Button";
import classes from "./AddLogData.module.css";

const degrees = "\u00B0";

const AddLogData = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <div className={classes.divForm}>
        <h1 className={classes.heading}>Add Log Data</h1>
        <Form
          method="post"
          action="/api/log/:voyageId"
          className={classes.form}
        >
          <label className={classes.label}>Date</label>
          <br />
          <input
            className={classes.input}
            name="logDate"
            type="date"
            required
          />
          <br />
          <label className={classes.label}>Time</label>
          <br />
          <input
            className={classes.input}
            name="voyageTime"
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
                type="number"
                min="0"
                max="90"
                placeholder="40"
              />
            </div>
            <div className={classes.coord}>
              <label className={classes.coordLabel}>Min</label>
              <br />
              <input
                className={classes.coordInput}
                name="latMin"
                type="text"
                maxlength="7"
                placeholder="32.8166"
              />
            </div>
            <div className={classes.coord}>
              <label className={classes.coordLabel}>N/S</label>
              <br />
              <input
                className={classes.coordInput}
                name="latDir"
                type="text"
                minlength="1"
                maxlength="1"
                placeholder="N"
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
                name="latDeg"
                type="number"
                min="0"
                max="90"
                placeholder="112"
              />
            </div>
            <div className={classes.coord}>
              <label className={classes.coordLabel}>Min</label>
              <br />
              <input
                className={classes.coordInput}
                name="latMin"
                type="text"
                maxlength="7"
                placeholder="02.3333"
              />
            </div>
            <div className={classes.coord}>
              <label className={classes.coordLabel}>E/W</label>
              <br />
              <input
                className={classes.coordInput}
                name="latDir"
                type="text"
                minlength="1"
                maxlength="1"
                placeholder="W"
              />
            </div>
          </div>

          <label className={classes.label}>{`Heading${degrees}`}</label>
          <br />
          <input
            className={classes.input}
            name="voyageHeading"
            type="number"
            min="0"
            max="360"
            placeholder="090"
          />
          <br />
          <label className={classes.label}>Notes</label>
          <br />
          <input className={classes.input} name="voyageNotes" type="text" />
          <br />
          <div className={classes.buttonDiv}>
            <Button
              type="button"
              disabled={isSubmitting}
              buttonName={isSubmitting ? "...Submititting" : "Submit"}
            />
          </div>
        </Form>
        {data && data.message && <p>{data.message}</p>}
      </div>
      <hr />
    </>
  );
};

export default AddLogData;
