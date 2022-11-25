import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import FumoList from "../components/FumoList";
import { fetchFumo } from "../http/fumoAPI";
import { Context } from "..";
import Pages from "../components/Pages";

const Shop = observer(() => {
  const { fumo } = useContext(Context);

  useEffect(() => {
    fetchFumo(null, null, 1, 9).then((data) => {
      fumo.setFumo(data.rows);
      fumo.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    if (fumo.selectedType === "all") {
      fetchFumo(null, fumo.page, 9).then((data) => {
        fumo.setFumo(data.rows);
        fumo.setTotalCount(data.count);
      });
    } else {
      fetchFumo(fumo.page, 9).then((data) => {
        fumo.setFumo(data.rows);
        fumo.setTotalCount(data.count);
      });
    }
  }, [fumo.page]);

  return (
    <Container>
      <Row>
        <Col md={2}></Col>
        <Col md={10}>
          <FumoList></FumoList>
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
