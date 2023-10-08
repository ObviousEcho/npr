import "./Backdrop.css";

const Backdrop = ({ show }) => {
  const cssClasses = ["backdrop", show ? "backdropOpen" : "backdropClosed"];

  return <div className={cssClasses.join(" ")}></div>;
};

export default Backdrop;
