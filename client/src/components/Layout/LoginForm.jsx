import { Form } from "react-router-dom";
import classes from "./LoginForm.module.css";
import Button from "../UI/Button";

const LoginForm = () => {
  return (
    <>
      <h1 className={classes.heading}>Login</h1>
      <div className={classes.divForm}>
        <Form className={classes.form}>
          <label className={classes.label}>User Name</label>
          <br />
          <input
            className={classes.input}
            name="User Name"
            type="text"
            placeHolder="Popeye"
          />
          <br />
          <label className={classes.label}>Password</label>
          <br />
          <input
            className={classes.input}
            name="password"
            type="password"
            placeHolder="OliveOil1234!"
          />
          <div className={classes.buttonDiv}>
            <Button type="button" buttonName="Submit" />
          </div>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
