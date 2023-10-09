import { Form } from "react-router-dom";
import { useModalContext } from "../../context/modal-context";

import "./ForgotPasswordModal.css";

const ForgotPassword = () => {
  const initialState = useModalContext();
  const show = initialState.isModal;
  const cssClasses = ["modal", show ? "modalOpen" : "modalClosed"];

  return (
    <main className={cssClasses.join(" ")}>
      <h3 className={"heading"}>Reset your password</h3>
      <Form method="post" action="" className={"emailForm"}>
        <label className={"emailLabel"}>Enter your email:</label>
        <input className={"emailInput"} />
      </Form>
    </main>
  );
};

export default ForgotPassword;
