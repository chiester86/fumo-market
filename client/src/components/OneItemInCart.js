import React, { useContext } from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { Context } from "../index";
import { NavLink } from "react-router-dom";

const OneItemInCart = ({ fumo }) => {
  const { cart, user } = useContext(Context);

  return (
    <Card key={fumo.id} style={{ width: "100%" }} className="mb-3">
      <Card.Body>
        <Row>
          <Col xs={4}>
            <Image
              src={process.env.REACT_APP_API_URL + fumo.img}
              style={{ width: "100%", maxWidth: 250 }}
            />
          </Col>
          <Col xs={4}>
            <Row>
              <Col xs={12}>
                <b>Title:</b>{" "}
                <NavLink to={`/fumo/${fumo.id}`}>{fumo.name}</NavLink>
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col xs={12}>
                <b>Description:</b>
                <br />
                <br />
                {fumo.info && fumo.info.length !== 0
                  ? fumo.info.map((info, i) => {
                      if (i % 2 === 0) {
                        return (
                          <Row key={info.id}>
                            <Col xs={6}>{info.title}</Col>
                            <Col xs={6}>{info.description}</Col>
                          </Row>
                        );
                      } else {
                        return (
                          <Row
                            key={info.id}
                            style={{ backgroundColor: "lightgray" }}
                          >
                            <Col xs={6}>{info.title}</Col>
                            <Col xs={6}>{info.description}</Col>
                          </Row>
                        );
                      }
                    })
                  : "Description absent"}
              </Col>
            </Row>
          </Col>
          <Col xs={4}>
            <Row>
              <Col xs={12} className="d-flex justify-content-center">
                {user.isAuth ? (
                  <Button
                    variant="outline-dark"
                    onClick={() => cart.setDeleteItemCart(fumo, true)}
                  >
                    Delete from Cart
                  </Button>
                ) : (
                  <Button
                    variant="outline-dark"
                    onClick={() => cart.setDeleteItemCart(fumo)}
                  >
                    Delete from Cart
                  </Button>
                )}
              </Col>
            </Row>
            <Row className="mt-5">
              <Col xs={12} className="d-flex justify-content-center">
                Count:
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={12} className="d-flex justify-content-center">
                <Button
                  variant="outline-dark"
                  onClick={() => cart.setCountFumo(fumo.id, "+")}
                >
                  +
                </Button>
                <input
                  className="ml-2 mr-2 pl-2 pr-2"
                  style={{ width: "20%" }}
                  type="number"
                  onChange={(e) => cart.setCountFumo(Number(e.target.value))}
                  value={fumo.count}
                />
                <Button
                  variant="outline-dark"
                  onClick={() => cart.setCountFumo(fumo.id, "-")}
                >
                  -
                </Button>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col xs={12} className="d-flex justify-content-center">
                Price: {fumo.price * fumo.count} RUB
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default OneItemInCart;
