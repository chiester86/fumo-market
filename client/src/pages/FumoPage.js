import React, { useEffect, useState, useContext } from "react";
import { Col, Container, Image, Card, Button, Row } from "react-bootstrap";
import BeautyStars from "../components/index";
import { useParams } from "react-router-dom";
import {
  fetchOneFumo,
  addFumoToCart,
  addRating,
  checkRating,
} from "../http/fumoAPI";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const FumoPage = observer(() => {
  const { user, cart } = useContext(Context);
  const [fumo, setFumo] = useState({ info: [] });
  const [resRate, setResRate] = useState("");
  const [isAccessRating, setIsAccessRating] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchOneFumo(id).then((data) => setFumo(data));
    if (user.isAuth) {
      checkRating({ fumoId: id }).then((res) => setIsAccessRating(res.allow));
    }
  }, [id, resRate]);

  const isFumoInCart = () => {
    const findFumo = cart.Cart.findIndex(
      (item) => Number(item.id) === Number(fumo.id)
    );
    return findFumo < 0;
  };

  const addFumoInCart = (fumo) => {
    if (user.isAuth) {
      addFumoToCart(fumo).then(() => cart.setCart(fumo, true));
    } else {
      cart.setCart(fumo);
    }
  };

  // const ratingChanged = (rate) => {
  //   addRating({
  //     rate,
  //     fumoId: id,
  //   }).then((res) => {
  //     setResRate(res);
  //   });
  // };

  return (
    <Container className="mt-3">
      <Row className="d-flex align-items-center justify-content-between">
        <Col md={5}>
          <Image
            width={500}
            height={400}
            src={process.env.REACT_APP_API_URL + fumo.img}
          ></Image>
        </Col>

        <Col md={5}>
          <Card
            className="d-flex flex-column justify-content-around"
            style={{
              width: "400px",
              height: "400px",
              fontSize: "32",
              paddingLeft: "10px",
            }}
          >
            <div>
              <label style={{ color: "#34c0eb", marginBottom: "3px" }}>
                Рейтинг покупателей
              </label>

              <BeautyStars
                value={fumo.rating || 0}
                // onChange={(value) => this.setState({ value })}
              />
            </div>
            <h3 style={{ textAlign: "left" }}>{fumo.name} </h3>
            <h3 style={{ textAlign: "left" }}>{fumo.price} ₽</h3>

            <label
              style={{
                color: "#34c0eb",
                textAlign: "left",
                marginRight: "15px",
              }}
            >
              Товар есть в наличии
            </label>
            <div className="text-center">
              {isFumoInCart() ? (
                <Button
                  style={{
                    cursor: "pointer",
                    width: "250px",
                  }}
                  variant="outline-dark"
                  onClick={() => addFumoInCart(fumo)}
                >
                  Add to Cart
                </Button>
              ) : (
                <Button
                  style={{
                    cursor: "pointer",
                    width: "250px",
                  }}
                  variant="outline-dark"
                  disabled
                >
                  Fumo already in cart
                </Button>
              )}
            </div>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {fumo.info.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transparent",
              padding: 10,
            }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
});

export default FumoPage;
