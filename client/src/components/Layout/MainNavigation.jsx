import { useState, useEffect } from "react";
import { NavLink, useRouteLoaderData } from "react-router-dom";
import classes from "./MainNavigation.module.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Auth from "../../utils/auth";

function MainNavigation() {
  const token = useRouteLoaderData("root");
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 1000;

  // re-render upon resize(portrait/landscape) to alter nav bar brand
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <Navbar expand="lg" sticky="top" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          {width > breakpoint ? (
            <span style={{ fontWeight: "bold" }}>Noon Position Report</span>
          ) : (
            <span style={{ fontWeight: "bold" }}>NPR</span>
          )}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              <p className={classes.link}>Home</p>
            </NavLink>
            {token ? (
              <>
                <NavLink
                  to={`/voyages`}
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  <p className={classes.link}>MyVoyages</p>
                </NavLink>

                <NavLink>
                  <p className={classes.link} onClick={Auth.logout}>
                    Logout
                  </p>
                </NavLink>
              </>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <p className={classes.link}>Login</p>
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavigation;
