import { Form } from "react-router-dom";
import { useModalContext } from "../../context/modal-context";
import Button from "../UI/Button";

import "./ForgotPasswordModal.css";

const ForgotPassword = () => {
  const { isModal, toggleModal } = useModalContext();

  const cssClasses = ["modal", isModal ? "modalOpen" : "modalClosed"];

  return (
    <main className={cssClasses.join(" ")}>
      <h3 className={"heading"}>Reset your password</h3>
      <Form method="post" action="" className={"emailForm"}>
        <label className={"emailLabel"}>Enter your email:</label>
        <input className={"emailInput"} />
        <div className={"button"}>
          <Button buttonName={"Submit"} />
        </div>
      </Form>
      <h4 className={"x"} onClick={toggleModal}>
        X
      </h4>
    </main>
  );
};

export default ForgotPassword;
