import { useGlobalContext } from "../../context/global-context";
import "./Backdrop.css";

const Backdrop = () => {
  const { isBackdrop, closeBackdrop } = useGlobalContext();

  const cssClasses = [
    "backdrop",
    isBackdrop ? "backdropOpen" : "backdropClosed",
  ];

  return <div className={cssClasses.join(" ")} onClick={closeBackdrop}></div>;
};

export default Backdrop;
