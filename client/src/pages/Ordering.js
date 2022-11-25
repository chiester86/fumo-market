import React, { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Context } from "../index";
import { sendOrder } from "../http/ordersAPI";
import { useNavigate } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/const";

const Ordering = () => {
  const { cart, user } = useContext(Context);
  const [phone, setPhone] = useState(null);
  const navigate = useNavigate();

  const buy = () => {
    let order = {
      number: phone,
      cart: cart.Cart,
    };

    if (user.isAuth) {
      order.auth = true;
    }

    sendOrder(order).then((data) => {
      console.log(data);
      cart.setDeleteAllDeviceFromCart();
      navigate(SHOP_ROUTE);
    });
  };
  return (
    <Container>
      <Form>
        <Form.Control
          placeholder="Input your phone..."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Form>
      <Row className="mt-3">
        <Col xs={12}>
          <Button variant="secondary" onClick={buy}>
            Купить
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Ordering;
