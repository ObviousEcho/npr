import classes from "./Signup.module.css";
import Button from "../components/UI/Button";

const Signup = () => {
  return (
    <>
      <h1 className={classes.heading}>Signup</h1>
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
          <label className={classes.label}>Email</label>
          <br />
          <input
            className={classes.input}
            name="email"
            type="email"
            placeHolder="popeye@spinach.com"
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
          <br />
          <div className={classes.buttonDiv}>
            <Button type="button" buttonName="Submit" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
