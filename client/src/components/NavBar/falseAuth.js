import React from "react";

import { Button, Nav } from "react-bootstrap";
import { LOGIN_ROUTE } from "../../utils/const";
import { NavLink } from "react-router-dom";
import CartNavBar from "../CartNavBar";

const FalseAuth = () => {
  return (
    <Nav className="ml-auto" style={{ color: "white" }}>
      <CartNavBar />
      <NavLink to={LOGIN_ROUTE}>
        <Button variant={"outline-light"}>Авторизация</Button>
      </NavLink>
    </Nav>
  );
};

export default FalseAuth;
