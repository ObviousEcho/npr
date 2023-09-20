import classes from "./Home.module.css";
import Button from "../components/UI/Button";

const Home = () => {
  return (
    <>
      <picture>
        <source media="(min-width: 1920px" srcSet="/images/yacht-1920w.jpg" />
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
      {/* <div className={classes.login}>
        <Button buttonName="Login" />
        <Button buttonName="Signup" />
      </div> */}
      <div className={classes.logout}>
        <Button buttonName="Logout" />
      </div>
    </>
  );
};

export default Home;
