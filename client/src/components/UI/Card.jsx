import { Link } from "react-router-dom";
import classes from "./Card.module.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateIcon from "@mui/icons-material/Update";

import { useGlobalContext } from "../../context/global-context";

const Card = ({
  voyageName,
  logId,
  logDate,
  time,
  latitude,
  longitude,
  heading,
  notes,
  svg,
}) => {
  const { toggleConfirmModal, setTitle, setId } = useGlobalContext();

  const [date] = logDate.split("T");
  let [logTime] = time.split(":00");

  if (logTime.length === 2) {
    logTime = `${logTime}:00`;
  }

  let headingDeg;
  if (heading.toString().length === 1) {
    headingDeg = `00${heading}\u00B0`;
  } else if (heading.toString().length === 2) {
    headingDeg = `0${heading}\u00B0`;
  } else {
    headingDeg = `${heading}\u00B0`;
  }

  const title = `${voyageName} ${date} ${logTime}`;

  const deleteLogData = () => {
    toggleConfirmModal();
    setTitle(title);
    setId(logId);
  };

  return (
    <section className={classes.card}>
      <div className={classes.container}>
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

        <div className={classes.imageDiv}>
          <img src={svg} height="135" alt="Nautical themed device" />
        </div>
      </div>
      <div className={classes.footer}>
        <div className={classes.notes}>
          <h6>Log:</h6>
          <p>{notes}</p>
        </div>
        <div className={classes.icon}>
          <div className={classes.updateTip}>
            <Link to={`/update-log/${logId}`}>
              <UpdateIcon
                sx={{
                  color: "#f89279",
                  fontSize: 40,
                }}
                className={classes.trash}
              />
            </Link>
            <span className={classes.updateToolipText}>Update entry</span>
          </div>
          <div className={classes.deleteTip}>
            <DeleteForeverIcon
              sx={{
                color: "#f89279",
                fontSize: 40,
              }}
              onClick={deleteLogData}
              className={classes.trash}
            />
            <span className={classes.deleteTooltipText}>Delete entry</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
