import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

import { Context } from "..";

import { Container, Navbar } from "react-bootstrap";
import { SHOP_ROUTE } from "../utils/const";
import TrueAuth from "./NavBar/trueAuth";
import FalseAuth from "./NavBar/falseAuth";

const NavBar = observer(() => {
  const { user } = useContext(Context);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{ color: "white" }} to={SHOP_ROUTE}>
          Fumo-Market
        </NavLink>
        {user.isAuth ? <TrueAuth /> : <FalseAuth />}
      </Container>
    </Navbar>
  );
});

export default NavBar;
