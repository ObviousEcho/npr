import { json, redirect } from "react-router-dom";
import NewVoyage from "../components/Layout/NewVoyage";
import Auth from "../utils/auth";

const Voyages = () => {
  return <NewVoyage />;
};

export default Voyages;

export async function action({ request }) {
  const data = await request.formData();
  const voyageData = {
    userId: "",
    voyageName: data.get("voyagename"),
  };
  const token = Auth.getToken();
  console.log(`voyages ${token}`);

  const response = await fetch("/api/voyages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorizatin: `Bearer ${token}`,
    },
    body: JSON.stringify(voyageData),
  });

  if (
    response.status === 422 ||
    response.status === 401 ||
    response.status === 400
  ) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Unable to add voyage!" }, { status: 500 });
  }

  const resData = await response.json();

  // return redirect("/voyages");
}
