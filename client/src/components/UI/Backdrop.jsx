import { useModalContext } from "../../context/modal-context";
import "./Backdrop.css";

const Backdrop = () => {
  const { isModal, toggleModal } = useModalContext();

  const cssClasses = ["backdrop", isModal ? "backdropOpen" : "backdropClosed"];

  return <div className={cssClasses.join(" ")} onClick={toggleModal}></div>;
};

export default Backdrop;
