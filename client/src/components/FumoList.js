import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { Row } from "react-bootstrap";
import FumoItem from "./FumoItem";

const FumoList = observer(() => {
  const { fumo } = useContext(Context);
  return (
    <Row className="d-flex">
      {fumo.fumo.map((fumo) => (
        <FumoItem key={fumo.id} fumo={fumo} />
      ))}
    </Row>
  );
});

export default FumoList;
