import {
  Form,
  useActionData,
  useNavigation,
  useParams,
} from "react-router-dom";

import Button from "../UI/Button";
import classes from "./AddLogDataForm.module.css";

const degrees = "\u00B0";

const AddLogData = () => {
  const data = useActionData();
  const params = useParams();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <div className={classes.divForm}>
        <h1 className={classes.heading}>Add Log Data</h1>
        <hr />
        <Form
          method="post"
          action={`/log/add-data/${params.voyageId}`}
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
                required
              />
            </div>
            <div className={classes.coord}>
              <label className={classes.coordLabel}>Min</label>
              <br />
              <input
                className={classes.coordInput}
                name="latMin"
                type="text"
                maxLength="7"
                placeholder="32.8166"
                required
              />
            </div>
            <div className={classes.coord}>
              <label className={classes.coordLabel}>N/S</label>
              <br />
              <input
                className={classes.coordInput}
                name="latDir"
                type="text"
                minLength="1"
                maxLength="1"
                placeholder="N"
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
                type="number"
                min="0"
                max="180"
                placeholder="112"
                required
              />
            </div>
            <div className={classes.coord}>
              <label className={classes.coordLabel}>Min</label>
              <br />
              <input
                className={classes.coordInput}
                name="longMin"
                type="text"
                maxLength="7"
                placeholder="02.3333"
                required
              />
            </div>
            <div className={classes.coord}>
              <label className={classes.coordLabel}>E/W</label>
              <br />
              <input
                className={classes.coordInput}
                name="longDir"
                type="text"
                minLength="1"
                maxLength="1"
                placeholder="W"
                required
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
            required
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
    </>
  );
};

export default AddLogData;
