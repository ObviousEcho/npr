import { Link, Form, useActionData, useNavigation } from "react-router-dom";
import classes from "./LoginForm.module.css";
import Button from "../UI/Button";
import { useGlobalContext } from "../../context/global-context";

const LoginForm = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { toggleModal } = useGlobalContext();

  const isSuccessful = localStorage.getItem("isSuccessful");

  return (
    <>
      <h1 className={classes.heading}>Login</h1>
      {isSuccessful && (
        <p className={classes.success}>
          You have successfully reset your password!
          <br /> You may now login.
        </p>
      )}
      <div className={classes.divForm}>
        <Form method="post" action="/login" className={classes.form}>
          <label className={classes.label}>User Email</label>
          <br />
          <input
            className={classes.input}
            name="email"
            type="email"
            placeholder="Popeye@sailor.com"
            required
            disabled={isSubmitting}
          />
          <br />
          <label className={classes.label}>Password</label>
          <br />
          <input
            className={classes.input}
            name="password"
            type="password"
            placeholder="OliveOil1234!"
            required
            disabled={isSubmitting}
          />
          <div className={classes.buttonDiv}>
            <Button
              type="button"
              disabled={isSubmitting}
              buttonName={isSubmitting ? "Submitting..." : "Submit"}
            />
          </div>
        </Form>
        <p>Don't have an account yet?</p>
        <Link to="/signup">
          <h4>Sign up</h4>
        </Link>
        <Link onClick={toggleModal}>
          <h6 className={classes.forgot}>Forgot Password</h6>
        </Link>
        {data && data.error && <p className={classes.error}>{data.error}</p>}
        {data && data.message && (
          <p className={classes.error}>{data.message}</p>
        )}
      </div>
    </>
  );
};

export default LoginForm;
