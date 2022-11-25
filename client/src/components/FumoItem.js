import React from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FUMO_ROUTE } from "../utils/const";

const FumoItem = ({ fumo }) => {
  const navigate = useNavigate();
  return (
    <Col
      md={3}
      className="mt-3"
      onClick={() => navigate(FUMO_ROUTE + "/" + fumo.id)}
    >
      <Card
        style={{ width: "150px", cursor: "pointer" }}
        border={"light"}
        className="mr-0"
      >
        <Image
          width={250}
          height={250}
          src={process.env.REACT_APP_API_URL + fumo.img}
        ></Image>
        <div className="mt-1 d-flex flex-column">
          <div>
            <h4>{fumo.price} ₽</h4>
          </div>

          <Row
            className="card-title"
            style={{
              width: "250px",
              height: "50px",
            }}
          >
            <div>{fumo.name}</div>
          </Row>

          <div style={{}}>
            <Button
              variant="outline-light"
              style={{ color: "#34c0eb", borderColor: "#34c0eb" }}
            >
              В корзину
            </Button>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default FumoItem;
