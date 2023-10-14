import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/global-context";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import classes from "./LogLinks.module.css";

const LogLinks = ({ voyage }) => {
  const { voyageId } = useParams();
  const { toggleConfirmModal, setTitle, setId } = useGlobalContext();

  const deleteVoyage = () => {
    toggleConfirmModal();
    setTitle(voyage);
    setId(voyageId);
  };

  return (
    <div className={classes.links}>
      <Link to={`/log/add-data/${voyageId}`}>Add Log</Link>
      <DeleteForeverIcon
        sx={{
          color: "turquoise",
          fontSize: 50,
        }}
        onClick={deleteVoyage}
      />
      <Link to={`/chart/${voyageId}`}>View Chart</Link>
    </div>
  );
};

export default LogLinks;
