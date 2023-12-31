import { useGlobalContext } from "../../context/global-context";
import "./ConfirmModal.css";
import Auth from "../../utils/auth";

const ConfirmModal = () => {
  const {
    confirmTitle,
    confirmId,
    setTitle,
    setId,
    isConfirmModal,
    toggleConfirmModal,
  } = useGlobalContext();

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  const cssClasses = [
    "confirmModal",
    isConfirmModal ? "openModal" : "closeModal",
  ];

  const toggleModal = () => {
    toggleConfirmModal();
    setTitle("");
    setId("");
  };

  const deleteVoyage = async () => {
    const response = await fetch(`/api/voyages/${confirmId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 500) {
      throw new Error({ error: response.status, message: response.message });
    }

    toggleModal();
    window.location.replace("/voyages");
  };

  const deleteLogEntry = async () => {
    const response = await fetch(`/api/log/del`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ logId: confirmId }),
    });

    if (response.status === 500) {
      throw new Error({ error: response.status, message: response.message });
    }

    toggleModal();
    window.location.replace("/voyages");
  };

  return (
    <div className="container">
      <main className={cssClasses.join(" ")}>
        <h4 className="title">{confirmTitle}</h4>
        <p className="message">
          Are you sure you would like to delete this entry and all of it's data?
        </p>
        <div className="click">
          <button
            className="buttons"
            onClick={confirmId.length > 30 ? deleteLogEntry : deleteVoyage}
          >
            Delete
          </button>
          <button className="buttons" onClick={toggleModal}>
            Cancel
          </button>
        </div>
        <h4 className="closeBtn" onClick={toggleModal}>
          X
        </h4>
      </main>
    </div>
  );
};

export default ConfirmModal;
