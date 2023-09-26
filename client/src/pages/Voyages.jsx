import { json, redirect } from "react-router-dom";
import NewVoyage from "../components/Forms/NewVoyage";
import VoyageList from "../components/Layout/VoyageList";
import Auth from "../utils/auth";

const Voyages = () => {
  return (
    <>
      <NewVoyage />
      <VoyageList />
    </>
  );
};

export default Voyages;

export async function action({ request }) {
  const data = await request.formData();
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const userData = Auth.getProfile();
  const userId = userData.data.userId;

  const voyageData = {
    userId,
    voyageName: data.get("voyagename"),
  };

  console.log(token);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  console.log(headers);

  const response = await fetch("/api/voyages", {
    method: "POST",
    headers,
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

  // const resData = await response.json();

  return redirect(`/voyages/${userId}`);
}

export async function loader() {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  // if (token) {
  const userData = Auth.getProfile();
  const userId = userData.data.userId;
  // }

  const response = await fetch(`/api/voyages/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
