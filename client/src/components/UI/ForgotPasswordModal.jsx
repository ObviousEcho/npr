// import { json } from "react-router-dom";
import { useState } from "react";
import { useModalContext } from "../../context/modal-context";
import Button from "../UI/Button";

import "./ForgotPasswordModal.css";

const ForgotPassword = () => {
  const [userEmail, setUserEmailState] = useState("");
  const [length, setLength] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOk, setIsOk] = useState(true);
  const { isModal, toggleModal } = useModalContext();

  const cssClasses = ["modal", isModal ? "modalOpen" : "modalClosed"];

  const emailChangeHandler = (e) => {
    const emailValue = e.target.value;
    setLength(false);
    setIsOk(true);
    setUserEmailState(emailValue);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (userEmail.length == 0) {
      setLength(true);
      return;
    }

    const response = await fetch("/api/users/requestpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail }),
    });

    if (response.status === 200) {
      setIsSubmitted(true);
    }

    if (!response.ok) {
      setIsOk(false);
    }
  };

  const resetModal = () => {
    setUserEmailState("");
    setIsSubmitted(false);
    setIsOk(true);
  };

  return (
    <main className={cssClasses.join(" ")}>
      {!isSubmitted ? (
        <>
          <h3 className={"heading"}>Reset your password</h3>
          <form className={"emailForm"}>
            <label className={"emailLabel"}>Enter your email:</label>
            <input
              className={"emailInput"}
              name="requestEmail"
              value={userEmail}
              type="email"
              required
              onChange={emailChangeHandler}
            />
            <div className={"button"} onClick={(e) => handleFormSubmit(e)}>
              <Button type="button" buttonName="Submit" />
            </div>
          </form>
        </>
      ) : (
        <main className={"success"}>
          <h2>Success</h2>
          <p className={"msg"}>
            Please check your email. A reset link will be sent to: {userEmail}
            <br />
            Link is valid for 10 minutes.
          </p>
          <p className={"newLink"}>
            Need to request another link? Click{" "}
            <a href="#" onClick={resetModal}>
              here!
            </a>
          </p>
        </main>
      )}
      <h4 className={"x"} onClick={toggleModal}>
        X
      </h4>
      {length && <p className={"error"}>You must enter a value.</p>}
      {!isOk && <p className={"error"}>Something went wrong!</p>}
    </main>
  );
};

export default ForgotPassword;
