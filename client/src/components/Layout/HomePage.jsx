import classes from "./HomePage.module.css";
import Button from "../UI/Button";
import { Link, useRouteLoaderData } from "react-router-dom";
import Auth from "../../utils/auth";
import { useModalContext } from "../../context/modal-context";

const HomePage = () => {
  const token = useRouteLoaderData("root");
  const { closeModal } = useModalContext();
  closeModal();

  return (
    <main className={classes.homePage}>
      <picture>
        <source media="(min-width: 1367px" srcSet="/images/yacht-1920w.jpg" />
        <source
          media="(orientation: landscape) and (min-width: 1000px)"
          srcSet="/images/yacht-1366x1024.jpg"
        />
        <source
          media="(orientation: portrait) and (min-width: 750px)"
          srcSet="/images/yacht-1024x1366.jpg"
        />
        <source
          media="(orientation: landscape) and (min-width: 420px)"
          srcSet="/images/yacht-896x414.jpg"
        />
        <img
          src="/images/yacht-450x915.jpg"
          alt="Yacht anchored in turquoise colored ocean."
          className={classes.image}
        />
      </picture>
      {!token ? (
        <div className={classes.login}>
          <Link to="/login" className={classes.link}>
            <Button buttonName="Login" />
          </Link>
          <Link to="/signup" className={classes.link}>
            <Button buttonName="Signup" />
          </Link>
        </div>
      ) : (
        <div className={classes.logout}>
          <Link onClick={Auth.logout} className={classes.link}>
            <Button buttonName="Logout" />
          </Link>
        </div>
      )}
    </main>
  );
};

export default HomePage;
