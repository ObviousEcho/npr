import { useReducer } from "react";
import {
  useLoaderData,
  Form,
  useParams,
  useActionData,
  useNavigation,
} from "react-router-dom";

import Button from "../UI/Button";
import classes from "./UpdateLogForm.module.css";

// reducer function for use with useState below, updates individual form values
const reducer = (state, action) => {
  switch (action.type) {
    case "ALTER_DATE":
      return {
        ...state,
        date: action.val,
      };
    case "ALTER_TIME":
      return {
        ...state,
        time: action.val,
      };
    case "ALTER_LATDEG":
      return {
        ...state,
        latDeg: action.val,
      };
    case "ALTER_LATMIN":
      return {
        ...state,
        latMin: action.val,
      };
    case "ALTER_LATDIR":
      return {
        ...state,
        latDir: action.val,
      };
    case "ALTER_LONGDEG":
      return {
        ...state,
        longDeg: action.val,
      };
    case "ALTER_LONGMIN":
      return {
        ...state,
        longMin: action.val,
      };
    case "ALTER_LONGDIR":
      return {
        ...state,
        longDir: action.val,
      };
    case "ALTER_HEADING":
      return {
        ...state,
        heading: action.val,
      };
    case "ALTER_NOTES":
      return {
        ...state,
        notes: action.val,
      };
    default:
      return {
        ...state,
      };
  }
};

const UpdateLogForm = () => {
  const loaderData = useLoaderData();
  const data = useActionData();
  const params = useParams();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // split date for display
  const { logDate, time, latitude, longitude, heading, notes } =
    loaderData.data[0];
  const date = logDate.split("T")[0];

  // split latitude for display
  const [laDeg, latMin, latDir] = latitude.split(" ");
  let latDeg = laDeg.split("\u00B0")[0];
  const degrees = "\u00B0";

  // split longitude for display
  const [loDeg, longMin, longDir] = longitude.split(" ");
  let longDeg = loDeg.split("\u00B0")[0];

  // useReducer hook to manage state values
  const [formState, dispatch] = useReducer(reducer, {
    date,
    time,
    latDeg,
    latMin,
    latDir,
    longDeg,
    longMin,
    longDir,
    heading,
    notes,
  });

  // handle form change values and dispatch function to update state values
  const FormChangeHandler = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    switch (inputType) {
      case "logDate":
        return dispatch({ type: "ALTER_DATE", val: inputValue });

      case "voyageTime":
        return dispatch({ type: "ALTER_TIME", val: inputValue });

      case "latDeg":
        return dispatch({ type: "ALTER_LATDEG", val: inputValue });

      case "latMin":
        return dispatch({ type: "ALTER_LATMIN", val: inputValue });

      case "latDir":
        return dispatch({ type: "ALTER_LATDIR", val: inputValue });

      case "longDeg":
        return dispatch({ type: "ALTER_LONGDEG", val: inputValue });

      case "longMin":
        return dispatch({ type: "ALTER_LONGMIN", val: inputValue });

      case "longDir":
        return dispatch({ type: "ALTER_LONGDIR", val: inputValue });

      case "voyageHeading":
        return dispatch({ type: "ALTER_HEADING", val: inputValue });

      case "voyageNotes":
        return dispatch({ type: "ALTER_NOTES", val: inputValue });

      default:
        throw Error("Something went wrong!");
    }
  };

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
            value={formState.date}
            type="date"
            required
            onChange={FormChangeHandler}
          />
          <br />
          <label className={classes.label}>Time</label>
          <br />
          <input
            className={classes.input}
            name="voyageTime"
            value={formState.time}
            type="time"
            required
            onChange={FormChangeHandler}
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
                value={formState.latDeg}
                type="number"
                min="0"
                max="90"
                required
                onChange={FormChangeHandler}
              />
            </div>
            <div className={classes.coord}>
              <label className={classes.coordLabel}>Min</label>
              <br />
              <input
                className={classes.coordInput}
                name="latMin"
                value={formState.latMin}
                type="text"
                maxLength="7"
                required
                onChange={FormChangeHandler}
              />
            </div>
            <div className={classes.coord}>
              <label className={classes.coordLabel}>N/S</label>
              <br />
              <input
                className={classes.coordInput}
                name="latDir"
                value={formState.latDir}
                type="text"
                minLength="1"
                maxLength="1"
                required
                onChange={FormChangeHandler}
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
                value={formState.longDeg}
                type="number"
                min="0"
                max="180"
                required
                onChange={FormChangeHandler}
              />
            </div>
            <div className={classes.coord}>
              <label className={classes.coordLabel}>Min</label>
              <br />
              <input
                className={classes.coordInput}
                name="longMin"
                value={formState.longMin}
                type="text"
                maxLength="7"
                required
                onChange={FormChangeHandler}
              />
            </div>
            <div className={classes.coord}>
              <label className={classes.coordLabel}>E/W</label>
              <br />
              <input
                className={classes.coordInput}
                name="longDir"
                value={formState.longDir}
                type="text"
                minLength="1"
                maxLength="1"
                required
                onChange={FormChangeHandler}
              />
            </div>
          </div>

          <label className={classes.label}>{`Heading${degrees}`}</label>
          <br />
          <input
            className={classes.input}
            name="voyageHeading"
            value={formState.heading}
            type="number"
            min="0"
            max="360"
            required
            onChange={FormChangeHandler}
          />
          <br />
          <label className={classes.label}>Notes</label>
          <br />
          <input
            className={classes.input}
            name="voyageNotes"
            value={formState.notes}
            type="text"
            onChange={FormChangeHandler}
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
        {data && data.message && <p>{data.message}</p>}
      </div>
    </>
  );
};

export default UpdateLogForm;
