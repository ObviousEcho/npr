import MainNavigation from "../components/Layout/MainNavigation";
import classes from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <>
      <MainNavigation />
      <header className={classes.header}>
        <h1>Shipwrecked?</h1>
        <h4>Something went wrong... Tough luck sailor!</h4>
      </header>
      <main
        className={classes.error}
        style={{ backgroundImage: "url(/images/monster.svg" }}
      ></main>
    </>
  );
};

export default ErrorPage;
