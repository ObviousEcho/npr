import { Form, useActionData, useNavigation } from "react-router-dom";
import classes from "./SignupForm.module.css";
import Button from "../UI/Button";

const SignupForm = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

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
          />
          <br />
          <label className={classes.label}>Email</label>
          <br />
          <input
            className={classes.input}
            name="email"
            type="email"
            placeholder="popeye@spinach.com"
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
          <br />
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

export default SignupForm;
