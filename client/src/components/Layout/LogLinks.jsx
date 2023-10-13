import { Link, useParams } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import classes from "./LogLinks.module.css";

const LogLinks = () => {
  const { voyageId } = useParams();
  return (
    <div className={classes.links}>
      <Link to={`/log/add-data/${voyageId}`}>Add Log</Link>
      <DeleteForeverIcon
        sx={{
          color: "turquoise",
          fontSize: 50,
        }}
      />
      <Link to={`/chart/${voyageId}`}>View Chart</Link>
    </div>
  );
};

export default LogLinks;
