import { useState, useEffect } from "react";
import { Link, Form, useActionData, useNavigation } from "react-router-dom";
import classes from "./SignupForm.module.css";
import Button from "../UI/Button";

const SignupForm = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(true);

  const passwordInputHandler = (e) => {
    let { name, value } = e.target;

    name === "password" ? setPassword(value) : setConfirmPassword(value);
  };

  useEffect(() => {
    return confirmPassword !== password ? setIsValid(false) : setIsValid(true);
  }, [password, confirmPassword]);

  const passwordResetHandler = () => {
    setPassword("");
    setConfirmPassword("");
    setIsValid(true);
  };

  return (
    <>
      <h1 className={classes.heading}>Signup</h1>
      <div className={classes.divForm}>
        <Form method="post" action="/signup" className={classes.form}>
          <label className={classes.label}>User Name</label>
          <br />
          <input
            className={classes.input}
            name="username"
            type="text"
            placeholder="Popeye"
            required
          />
          <br />
          <label className={classes.label}>Email</label>
          <br />
          <input
            className={classes.input}
            name="email"
            type="email"
            placeholder="popeye@spinach.com"
            required
          />
          <br />
          <label className={classes.label}>Password</label>
          <br />
          <input
            className={classes.input}
            name="password"
            type="password"
            value={password}
            placeholder="OliveOil1234!"
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
            value={confirmPassword}
            placeholder="OliveOil1234!"
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
        <p>Already have an account?</p>
        <Link to="/login">
          <h5>Login</h5>
        </Link>
        {data && data.errors && <p>{data.errors}</p>}
        {data && data.message && <p>{data.message}</p>}
      </div>
    </>
  );
};

export default SignupForm;
