import { json, redirect } from "react-router-dom";

import AddLogDataForm from "../components/Forms/AddLogDataForm";
import Auth from "../utils/auth";

const AddData = () => {
  return <AddLogDataForm />;
};

export default AddData;

export async function action({ request, params }) {
  const data = await request.formData();
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return redirect("/login");
  }

  const logData = {
    voyageId: params.voyageId,
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
    voyageId: logData.voyageId,
    logDate: logData.logDate,
    time: logData.time,
    latitude: `${logData.latDeg}\u00B0 ${logData.latMin}' ${logData.latDir}`,
    longitude: `${logData.longDeg}\u00B0 ${logData.longMin}' ${logData.longDir}`,
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

  if (response.status === 400) {
    throw json({ message: "Bad request." }, { status: 400 });
  }

  if (!response.ok) {
    throw json({ message: "Unable to add log data!" }, { status: 500 });
  }

  return redirect(`/log/${params.voyageId}`);
}
