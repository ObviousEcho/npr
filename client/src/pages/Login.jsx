import classes from "./Login.module.css";
import Button from "../components/UI/Button";

const Login = () => {
  return (
    <>
      <h1 className={classes.heading}>Login</h1>
      <div className={classes.divForm}>
        <form className={classes.form}>
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
            placeHolder="OliveOil"
          />
          <div className={classes.buttonDiv}>
            <Button type="button" buttonName="Submit" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
