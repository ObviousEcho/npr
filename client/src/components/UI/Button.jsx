import classes from "./Button.module.css";

const Button = ({ buttonName }) => {
  return <button className={classes.button}>{buttonName}</button>;
};

export default Button;
