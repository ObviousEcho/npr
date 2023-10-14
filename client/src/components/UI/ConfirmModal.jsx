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

  const confirmDelete = async () => {
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

  return (
    <main className={cssClasses.join(" ")}>
      <h3 className="title">{confirmTitle}</h3>
      <p className="message">
        Are you sure you would like to delete this entry and all of it's data?
      </p>
      <div className="click">
        <button className="buttons" onClick={confirmDelete}>
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
  );
};

export default ConfirmModal;
