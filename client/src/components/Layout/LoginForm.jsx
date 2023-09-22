import { Form, useActionData, useNavigation } from "react-router-dom";
import classes from "./LoginForm.module.css";
import Button from "../UI/Button";

const LoginForm = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

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
          />
          <br />
          <label className={classes.label}>Password</label>
          <br />
          <input
            className={classes.input}
            name="password"
            type="password"
            placeholder="OliveOil1234!"
          />
          <div className={classes.buttonDiv}>
            <Button
              type="button"
              disabled={isSubmitting}
              buttonName={isSubmitting ? "Submitting..." : "Submit"}
            />
          </div>
        </Form>
        {data && data.errors && <p>{data.errors}</p>}
        {data && data.message && <p>{data.message}</p>}
      </div>
    </>
  );
};

export default LoginForm;
