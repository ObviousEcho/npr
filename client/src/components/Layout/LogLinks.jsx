import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/global-context";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import UpdateIcon from "@mui/icons-material/Update";

import classes from "./LogLinks.module.css";

const LogLinks = ({ voyage }) => {
  const { voyageId } = useParams();
  const { toggleConfirmModal, toggleUpdateModal, setTitle, setId } =
    useGlobalContext();

  const updateVoyage = () => {
    toggleUpdateModal();
    setTitle(voyage);
    setId(voyageId);
  };

  const deleteVoyage = () => {
    toggleConfirmModal();
    setTitle(voyage);
    setId(voyageId);
  };

  return (
    <div className={classes.links}>
      <Link to={`/log/add-data/${voyageId}`}>Add Log</Link>
      <div>
        <div className={classes.updateTooltip}>
          <UpdateIcon
            sx={{
              color: "turquoise",
              fontSize: 50,
            }}
            className={classes.icon}
            onClick={updateVoyage}
          />
          <span className={classes.updateTooltiptext}>Update voyage</span>
        </div>
        <div className={classes.deleteTooltip}>
          <DeleteForeverIcon
            sx={{
              color: "turquoise",
              fontSize: 50,
            }}
            className={classes.icon}
            onClick={deleteVoyage}
          />
          <span className={classes.deleteTooltiptext}>Delete voyage</span>
        </div>
      </div>
      <Link to={`/chart/${voyageId}`}>View Chart</Link>
    </div>
  );
};

export default LogLinks;
