import { Link, Form, useActionData, useNavigation } from "react-router-dom";
import classes from "./LoginForm.module.css";
import Button from "../UI/Button";
import { useModalContext } from "../../context/modal-context";

const LoginForm = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const initialState = useModalContext();

  return (
    <>
      <h1 className={classes.heading}>Login</h1>
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
          />
          <div className={classes.buttonDiv}>
            <Button
              type="button"
              disabled={isSubmitting}
              buttonName={isSubmitting ? "Submitting..." : "Submit"}
            />
          </div>
        </Form>
        <p>Don't have an acount yet?</p>
        <Link to="/signup">
          <h5>Sign up</h5>
        </Link>
        <Link onClick={initialState.toggleModal}>Forgot Password</Link>
        {data && data.errors && <p>{data.errors}</p>}
        {data && data.message && <p>{data.message}</p>}
      </div>
    </>
  );
};

export default LoginForm;
