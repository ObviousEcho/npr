import { useState, useEffect } from "react";
import { Form, useNavigation, useActionData } from "react-router-dom";

import Button from "../UI/Button";
import classes from "./PasswordResetForm.module.css";

const PasswordResetForm = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isValid, setIsValid] = useState(true);

  const passwordInputHandler = (e) => {
    const { name, value } = e.target;

    name === "password" ? setNewPassword(value) : setConfirmNewPassword(value);
  };

  useEffect(() => {
    return confirmNewPassword !== newPassword
      ? setIsValid(false)
      : setIsValid(true);
  }, [newPassword, confirmNewPassword]);

  const passwordResetHandler = () => {
    setNewPassword("");
    setConfirmNewPassword("");
    setIsValid(true);
  };

  return (
    <>
      <h1 className={classes.heading}>Reset Your Password</h1>
      <div className={classes.divForm}>
        <Form method="post" action="/password-reset" className={classes.form}>
          <label className={classes.label}>New Password</label>
          <br />
          <input
            className={classes.input}
            name="password"
            type="password"
            value={newPassword}
            required
            onChange={passwordInputHandler}
          />
          <br />
          <label
            className={`${classes["label"]} ${!isValid && classes.invalid}`}
          >
            Confirm Password
          </label>
          <br />
          <input
            className={`${classes["input"]} ${!isValid && classes.invalid}`}
            name="confirmPassword"
            type="password"
            value={confirmNewPassword}
            required
            onChange={passwordInputHandler}
          />
          <br />
          <div className={classes.buttonDiv}>
            <Button
              type="button"
              disabled={isSubmitting}
              buttonName={isSubmitting ? "Submitting..." : "Submit"}
              onClick={passwordResetHandler}
            />
          </div>
        </Form>
        {data && data.errors && <p>{data.errors}</p>}
        {data && data.message && <p>{data.message}</p>}
      </div>
    </>
  );
};

export default PasswordResetForm;
