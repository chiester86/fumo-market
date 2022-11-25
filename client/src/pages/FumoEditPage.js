import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDeleteFumo, fetchOneFumo, updateFumo } from "../http/fumoAPI";
import { Context } from "../index";
import { ADMIN_ROUTE } from "../utils/const";

const FumoEditPage = () => {
  const navigate = useNavigate();
  const { fumo } = useContext(Context);
  const { id } = useParams();
  const [fumoCurr, setFumoCurr] = useState({});
  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [img, setImg] = useState("");
  const [imgFile, setFile] = useState(null);
  const [info, setInfo] = useState([]);

  const [isDisabledPutBtn, setDisabledPutBtn] = useState(true);

  const deleteFumo = () => {
    fetchDeleteFumo(id).then(() => {
      navigate.push(ADMIN_ROUTE);
    });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const imgHandler = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const addInfo = () => {
    setInfo([...info, { title: "", description: "", id: Date.now() }]);
  };

  const deleteInfo = (number) => {
    setInfo(info.filter((item) => item.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(info.map((i) => (i.id === number ? { ...i, [key]: value } : i)));
  };

  const putFumo = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", imgFile);
    formData.append("info", JSON.stringify(info));
    updateFumo(id, formData).then((data) => {
      setShowMsg(true);
      setMsg(data);
      setTimeout(() => setShowMsg(true), 5000);
    });
  };

  const checkInfo = () => {
    let isInfoEmpty = true;
    info.forEach((item) => {
      for (let key in item) {
        if (key === "title" || key === "description") {
          if (!item[key]) {
            isInfoEmpty = false;
          }
        }
      }
    });
    return isInfoEmpty;
  };

  useEffect(() => {
    let checkInfoVal = false;
    if (fumoCurr.info && fumoCurr.info.length !== info.length) {
      checkInfoVal = checkInfo();
    }

    if (fumoCurr) {
      if (
        fumoCurr.name !== name ||
        fumoCurr.price !== price ||
        checkInfoVal ||
        img
      ) {
        setDisabledPutBtn(false);
      } else {
        setDisabledPutBtn(true);
      }
    }
  }, [name, price, img, info]);

  useEffect(() => {
    fetchOneFumo(id).then((data) => {
      setFumoCurr(data);
      setName(data.name);
      setPrice(data.price);
      setInfo(data.info);
    });
  }, [id]);

  return (
    <Container className="mt-3">
      {showMsg && <Row>{msg}</Row>}

      <Row>
        <Col xs={12}>
          <Row>
            <Col xs={1} className="d-flex align-items-center">
              id:
            </Col>
            <Col xs={11}>{fumoCurr.id}</Col>
          </Row>

          {/*Name*/}
          <Row>
            <Col xs={1} className="d-flex align-items-center">
              Name:
            </Col>
            <Col xs={8}>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col xs={3} className="d-flex align-items-center">
              {name.length === 0 && (
                <b style={{ color: "red" }}>Введите имя фумо</b>
              )}
            </Col>
          </Row>
          {/*Name*/}
          <Row className="mt-2">
            <Col xs={1} className="d-flex align-items-center">
              Price:
            </Col>
            <Col xs={8}>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </Col>
            <Col xs={3} className="d-flex align-items-center">
              {price === 0 && <b style={{ color: "red" }}>Введите цену</b>}
            </Col>
          </Row>

          {/*Name*/}
          <Row className="mt-4">
            <Col
              xs={3}
              className="d-flex flex-column justify-content-center text-center"
            >
              Текущее изображение: <br />
              <Image
                style={{ margin: "0 auto", marginTop: 15 }}
                width={150}
                src={process.env.REACT_APP_API_URL + fumoCurr.img}
              />
            </Col>
            {img && (
              <Col
                xs={6}
                className="d-flex flex-column justify-content-center text-center"
              >
                Новое изображение: <br />
                <Image
                  style={{ margin: "0 auto", marginTop: 15 }}
                  width={150}
                  src={img}
                />
              </Col>
            )}
            <Col xs={3} className="d-flex align-items-center">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Group>
                  <Form.File
                    id="exampleFormControlFile1"
                    label="Upload file"
                    onChange={imgHandler}
                  />
                </Form.Group>
              </Form.Group>
            </Col>
          </Row>

          {/*Characteristics*/}
          <Row className="d-flex flex-column m-3">
            <h4>Характеристики</h4>
            <Button variant="outline-dark" onClick={() => addInfo()}>
              Добавить новое свойство
            </Button>
            {info.map((item, index) => (
              <Row key={index} className="mt-3">
                <Col md={4}>
                  <Form.Control
                    placeholder="Input title for the device..."
                    value={item.title}
                    onChange={(e) =>
                      changeInfo("title", e.target.value, item.id)
                    }
                  />
                  {!info[index].title && (
                    <b style={{ color: "red" }}>Название</b>
                  )}
                </Col>
                <Col md={4}>
                  <Form.Control
                    placeholder="Input description for the device..."
                    value={item.description}
                    onChange={(e) =>
                      changeInfo("description", e.target.value, item.id)
                    }
                  />
                  {!info[index].description && (
                    <b style={{ color: "red" }}>Описание</b>
                  )}
                </Col>
                <Col md={4}>
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteInfo(item.number)}
                  >
                    Удалить
                  </Button>
                </Col>
              </Row>
            ))}
          </Row>

          <Row className="mt-5">
            <Col xs={12}>
              {isDisabledPutBtn ? (
                <Button disabled>Изменить</Button>
              ) : (
                <Button onClick={putFumo}>Изменить</Button>
              )}
              <Button className="ml-5" variant="danger" onClick={handleShow}>
                Удалить
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Удалить эту фумо {fumoCurr.id}?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={deleteFumo}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FumoEditPage;
