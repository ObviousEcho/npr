import { json, redirect } from "react-router-dom";
import NewVoyage from "../components/Forms/NewVoyage";
import VoyageList from "../components/Layout/VoyageList";
import Auth from "../utils/auth";

import { useGlobalContext } from "../context/global-context";

const Voyages = () => {
  const { closeConfirmModal } = useGlobalContext();

  closeConfirmModal();

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

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch("/api/voyages", {
    method: "POST",
    headers,
    body: JSON.stringify(voyageData),
  });

  if (response.status === 400) {
    throw json({ message: "Bad request." }, { status: 400 });
  }

  if (!response.ok) {
    throw json({ message: "Unable to add voyage!" }, { status: 500 });
  }

  const resData = await response.json();
  const voyageId = resData.data;

  return redirect(`/log/${voyageId}`);
}

export async function loader() {
  const token = Auth.loggedIn() ? Auth.getToken() : null;

  if (!token) {
    return redirect("/login");
  }

  const userData = Auth.getProfile();
  const userId = userData.data.userId;

  const response = await fetch(`/api/voyages/${userId}`, {
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
