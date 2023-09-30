import { json, redirect, useParams } from "react-router-dom";

import AddLogDataForm from "../components/Forms/AddLogDataForm";
import Auth from "../utils/auth";

let voyageId = "";

const closure = (param) => {
  voyageId = param;
};

const AddData = () => {
  const params = useParams();
  closure(params.voyageId);

  return <AddLogDataForm />;
};

export default AddData;

export async function action({ request }) {
  const data = await request.formData();
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return redirect("/login");
  }

  const logData = {
    voyageId,
    logDate: data.get("logDate"),
    time: data.get("voyageTime"),
    latDeg: data.get("latDeg"),
    latMin: data.get("latMin"),
    latDir: data.get("latDir").toUpperCase(),
    longDeg: data.get("longDeg"),
    longMin: data.get("longMin"),
    longDir: data.get("longDir").toUpperCase(),
    heading: data.get("voyageHeading"),
    notes: data.get("voyageNotes"),
  };

  const newLogData = {
    voyageId: voyageId,
    logDate: logData.logDate,
    time: logData.time,
    latitude: `${logData.latDeg} ${logData.latMin} ${logData.latDir}`,
    longitude: `${logData.longDeg} ${logData.longMin} ${logData.longDir}`,
    heading: logData.heading,
    notes: logData.notes,
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch("/api/log", {
    method: "POST",
    headers,
    body: JSON.stringify(newLogData),
  });

  if (
    response.status === 422 ||
    response.status === 401 ||
    response.status === 400
  ) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Unable to add log data!" }, { status: 500 });
  }

  return redirect(`/log/${voyageId}`);
}
