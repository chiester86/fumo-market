import React, { useContext } from "react";
import { Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Context } from "..";
import shopCart from "./NavBar/shopping-basket.png";
import { observer } from "mobx-react-lite";
import { CART_ROUTE } from "../utils/const";

const CartNavBar = observer(() => {
  const { cart } = useContext(Context);

  return (
    <div className="d-flex align-items-center mr-3">
      <NavLink to={CART_ROUTE} className="d-flex align-items-center">
        <Image
          src={shopCart}
          style={{ width: "100%", maxWidth: 30 }}
          alt="cart"
        />
        <div
          className="ml-2"
          style={{ textDecoration: "none", color: "white" }}
        >
          {cart.Price} RUB
        </div>
      </NavLink>
    </div>
  );
});
export default CartNavBar;
