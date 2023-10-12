import { useGlobalContext } from "../../context/global-context";
import "./Backdrop.css";

const Backdrop = () => {
  const { isModal, toggleModal } = useGlobalContext();

  const cssClasses = ["backdrop", isModal ? "backdropOpen" : "backdropClosed"];

  return <div className={cssClasses.join(" ")} onClick={toggleModal}></div>;
};

export default Backdrop;
