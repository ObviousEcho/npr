import { useState } from "react";
import { redirect, json } from "react-router-dom";
import Auth from "../utils/auth";

import UpdateLogForm from "../components/Forms/UpdateLogForm";

let vId;

const UpdateLog = () => {
  const [voyageId, setVoyageId] = useState("");

  // retrieve voyageId from child component
  const getVoyageId = (str) => {
    setVoyageId(str);
    vId = voyageId;
  };

  return <UpdateLogForm getId={getVoyageId} />;
};

export default UpdateLog;

export async function loader({ params }) {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return redirect("/login");
  }

  const response = await fetch(`/api/log/single/${params.logId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Response({ message: "Unable to fetch data" }, { status: 500 });
  }

  return response;
}

export async function action({ request, params }) {
  const data = await request.formData();
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return redirect("/login");
  }

  const logId = params.logId;
  const logData = {
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

  const response = await fetch(`/api/log/${logId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(newLogData),
  });

  if (response.status === 400) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Unable to update log data!" }, { status: 500 });
  }

  return redirect(`/log/${vId}`);
}
