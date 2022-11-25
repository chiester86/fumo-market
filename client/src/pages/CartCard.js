import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "../index";
import { Button, Col, Image, Row } from "react-bootstrap";
import OneItemInCart from "../components/OneItemInCart";

import { ORDERING_ROUTE } from "../utils/const";
import { NavLink } from "react-router-dom";

const CartCard = observer(() => {
  const { cart } = useContext(Context);
  const { fumo } = useContext(Context);

  if (cart.Cart.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <Image src={fumo.img} />
        <div className="text-center mt-5" style={{ fontSize: 28 }}>
          <b>Empty shopping cart</b>
        </div>
      </div>
    );
  }

  return (
    <>
      <br />
      <NavLink to={ORDERING_ROUTE}>
        <Button>Checkout</Button>
      </NavLink>
      <Row className="mt-3">
        <Col xs={12}>
          {cart.Cart.map((fumo) => (
            <OneItemInCart key={fumo.id} fumo={fumo} />
          ))}
        </Col>
      </Row>
    </>
  );
});

export default CartCard;
