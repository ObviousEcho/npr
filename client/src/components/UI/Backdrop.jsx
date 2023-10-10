import { useModalContext } from "../../context/modal-context";
import "./Backdrop.css";

const Backdrop = () => {
  const initialState = useModalContext();
  const show = initialState.isModal;

  const cssClasses = ["backdrop", show ? "backdropOpen" : "backdropClosed"];

  return (
    <div
      className={cssClasses.join(" ")}
      onClick={initialState.toggleModal}
    ></div>
  );
};

export default Backdrop;
