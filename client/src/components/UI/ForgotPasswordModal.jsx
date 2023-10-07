import { Form } from "react-router-dom";

import classes from "./ForgotPasswordModal.module.css";

const ForgotPassword = () => {
  return (
    <>
      <div className={classes.background}></div>
      <main className={classes.modalBody}>
        <h3 className={classes.heading}>Reset your password</h3>
        <Form method="post" action="" className={classes.email}>
          <label className={classes.label}>Enter your email:</label>
          <input className={classes.input} />
        </Form>
      </main>
    </>
  );
};

export default ForgotPassword;
