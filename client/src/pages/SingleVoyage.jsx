import { useParams } from "react-router-dom";

import AddLogData from "../components/Forms/AddLogData";
import ViewLogData from "../components/Layout/ViewLogData";

const SingleVoyage = () => {
  const params = useParams();
  console.log(params.voyageId);

  return (
    <>
      <AddLogData />
      <ViewLogData />
    </>
  );
};

export default SingleVoyage;
