import { useRouteError } from "react-router-dom";

import MainNavigation from "../components/Layout/MainNavigation";
import classes from "./ErrorPage.module.css";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "An error occurred";
  let message = "Something went wrong!";

  if (error.status === 400) {
    title = error.status;
    message = error.data.message;
  }

  if (error.status === 404) {
    title = error.status;
    if (error.statusText) {
      message = error.statusText;
    } else {
      message = error.data.message;
    }
  }

  if (error.status === 500) {
    title = error.status;
    message = error.data.message;
  }

  return (
    <>
      <MainNavigation />
      <header className={classes.header}>
        <h2>Shipwrecked?</h2>
        <h4>
          <span className={classes.err}>{title}...</span> Tough luck sailor!
        </h4>
        <p>
          <span className={classes.err}>{message}</span>
        </p>
      </header>
      <main
        className={classes.error}
        style={{ backgroundImage: "url(/images/monster.svg" }}
      ></main>
    </>
  );
};

export default ErrorPage;
