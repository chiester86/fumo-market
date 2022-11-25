import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { createFumo } from "../http/fumoAPI";

const CreateFumo = observer(({ show, onHide }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", num: Date.now() }]);
  };
  const removeInfo = (num) => {
    setInfo(info.filter((i) => i.num !== num));
  };
  const changeInfo = (key, value, num) => {
    setInfo(info.map((i) => (i.num === num ? { ...i, [key]: value } : i)));
  };

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addFumo = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("info", JSON.stringify(info));
    createFumo(formData).then(() => onHide());
  };

  return (
    <Modal show={show} onHide={onHide} size="tg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить товар</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите название..."
          ></Form.Control>
          <Form.Control
            className="mt-2"
            type="number"
            placeholder="Введите стоимость..."
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          ></Form.Control>
          <Form.Control
            className="mt-3"
            type="file"
            onChange={selectFile}
          ></Form.Control>
        </Form>
        <hr></hr>
        <Button variant="outline-dark" onClick={addInfo}>
          Добавить свойство
        </Button>
        {info.map((i) => (
          <Row className="mt-3" key={i.num}>
            <Col md={4}>
              <Form.Control
                value={i.title}
                onChange={(e) => changeInfo("title", e.target.value, i.num)}
                placeholder="Введите название свойства..."
              ></Form.Control>
            </Col>
            <Col md={4}>
              <Form.Control
                value={i.description}
                onChange={(e) =>
                  changeInfo("description", e.target.value, i.num)
                }
                placeholder="Введите описание..."
              ></Form.Control>
            </Col>
            <Col md={4}>
              <Button
                variant="outline-danger"
                onClick={() => removeInfo(i.num)}
              >
                Удалить
              </Button>
            </Col>
          </Row>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Отменить
        </Button>
        <Button variant="outline-success" onClick={addFumo}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateFumo;
