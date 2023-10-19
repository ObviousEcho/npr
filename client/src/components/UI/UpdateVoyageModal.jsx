import { useState } from "react";
import { useParams } from "react-router-dom";

import { useGlobalContext } from "../../context/global-context";
import Button from "../UI/Button";
import Auth from "../../utils/auth";

import "./UpdateVoyageModal.css";

const UpdateVoyageModal = () => {
  const params = useParams();
  const [newTitle, setNewTitle] = useState("");
  const [length, setLength] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOk, setIsOk] = useState(true);
  const { isUpdateModal, toggleUpdateModal, confirmTitle, setTitle } =
    useGlobalContext();

  const cssClasses = [
    "updateModal",
    isUpdateModal ? "updateModalOpen" : "updateModalClosed",
  ];

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  const titleChangeHandler = (e) => {
    const emailValue = e.target.value;
    setLength(false);
    setIsOk(true);
    setNewTitle(emailValue);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (newTitle.length === 0) {
      setLength(true);
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    };

    const response = await fetch(`/api/voyages/${params.voyageId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ newTitle }),
    });

    if (response.status === 200) {
      setIsSubmitted(true);
      setTitle("");
    }

    if (!response.ok) {
      setIsOk(false);
      setTitle("");
    }
  };

  return (
    <main className={cssClasses.join(" ")}>
      {!isSubmitted ? (
        <>
          <h3 className="updateHeading">{`Update your ${confirmTitle} voyage`}</h3>
          <form className="updateForm">
            <label className="updateLabel">Enter new title:</label>
            <input
              className="updateInput"
              name="requestEmail"
              value={newTitle}
              type="email"
              required
              onChange={titleChangeHandler}
            />
            <div className={"button1"} onClick={(e) => handleFormSubmit(e)}>
              <Button type="button" buttonName="Submit" />
            </div>
          </form>
        </>
      ) : (
        <main className="successful">
          <h2>Success</h2>
        </main>
      )}
      <h4 className="close" onClick={toggleUpdateModal}>
        X
      </h4>
      {length && <p className="updateError">You must enter a value.</p>}
      {!isOk && <p className="updateError">Something went wrong!</p>}
    </main>
  );
};

export default UpdateVoyageModal;
