import { Button, Nav } from "react-bootstrap";
import React, { useContext } from "react";
import { Context } from "../..";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE } from "../../utils/const";
import { ORDERS_ROUTE } from "../../utils/const";
import CartNavBar from "../CartNavBar";

const TrueAuth = () => {
  const { user, cart } = useContext(Context);
  const navigate = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("token");
    cart.resetCart();
  };

  return (
    <Nav className="ml-auto" style={{ color: "white" }}>
      <CartNavBar />
      {user.isAuth && user.User.role === "ADMIN" && (
        <Button
          className={"mr-3"}
          variant={"outline-light"}
          onClick={() => {
            navigate(ORDERS_ROUTE);
          }}
        >
          Заказы
        </Button>
      )}
      {user.role === "ADMIN" && user.isAuth} ?{" "}
      {
        <Button
          className={"mr-3"}
          variant={"outline-light"}
          onClick={() => {
            navigate(ADMIN_ROUTE);
          }}
        >
          Админ панель
        </Button>
      }
      <Button variant={"outline-light"} onClick={() => logOut()}>
        Выйти
      </Button>
    </Nav>
  );
};

export default TrueAuth;
