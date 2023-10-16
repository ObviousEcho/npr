import { redirect } from "react-router-dom";
import Auth from "../utils/auth";

import UpdateLogForm from "../components/Forms/UpdateLogForm";

const UpdateLog = () => {
  return <UpdateLogForm />;
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
