import { useFetcher, json } from "react-router-dom";
import { useModalContext } from "../../context/modal-context";
import Button from "../UI/Button";

import "./ForgotPasswordModal.css";

const ForgotPassword = () => {
  const fetcher = useFetcher();
  const { isModal, toggleModal } = useModalContext();

  const cssClasses = ["modal", isModal ? "modalOpen" : "modalClosed"];

  return (
    <main className={cssClasses.join(" ")}>
      <h3 className={"heading"}>Reset your password</h3>
      <fetcher.Form
        method="post"
        action="/requestPassword"
        className={"emailForm"}
      >
        <label className={"emailLabel"}>Enter your email:</label>
        <input className={"emailInput"} name="requestEmail" type="email" />
        <div className={"button"}>
          <Button type="button" buttonName="Submit" />
        </div>
      </fetcher.Form>
      <h4 className={"x"} onClick={toggleModal}>
        X
      </h4>
    </main>
  );
};

export default ForgotPassword;

export async function action({ request }) {
  const data = await request.formData();
  const userEmail = data.get("requestEmail");

  const response = await fetch("/api/users/requestpassword", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userEmail }),
  });

  if (response.status === 400 || response.status === 404) {
    throw json({ message: response.statusText }, { status: response.status });
  }

  if (!response.ok) {
    throw json({ message: "Unable to perform request." }, { status: 500 });
  }

  window.location.replace("/login");

  return null;
}
