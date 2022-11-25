import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Pagination,
  Dropdown,
  InputGroup,
  Form,
  ListGroup,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import CreateFumo from "../components/CreateFumo";
import { NavLink } from "react-router-dom";
import { getAllFumoInAdminPage } from "../http/fumoAPI";
import { FUMO_EDIT_ROUTE } from "../utils/const";

const Admin = () => {
  const [fumoVisible, setFumoVisible] = useState(false);
  const [searchFumo, setSearchFumo] = useState("");
  const [searchedFumo, setSearchedFumo] = useState([]);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(1);

  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const limit = 4;
  const pageCount = Math.ceil(Number(count) / limit);
  const pages = [];
  for (let number = 1; number < pageCount + 1; number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    getAllFumoInAdminPage(searchFumo, currentPage, filter).then(
      ({ count, rows }) => {
        setSearchedFumo(rows);
        setCount(count);
      }
    );
  }, [currentPage]);

  useEffect(() => {
    getAllFumoInAdminPage(searchFumo, 1, filter).then(({ count, rows }) => {
      setSearchedFumo(rows);
      setCount(count);
      setCurrentPage(1);
    });
  }, [filter, successMsg]);

  const fetchFumo = () => {
    getAllFumoInAdminPage(searchFumo, currentPage, filter).then(
      ({ count, rows }) => {
        setSearchedFumo(rows);
        setCount(count);
      }
    );
  };

  return (
    <Container className="d-flex flex-column">
      {showSuccessMsg && <p>{successMsg}</p>}
      <Button
        variant="outline-dark"
        className="mt-2"
        onClick={() => setFumoVisible(true)}
      >
        Добавить товар
      </Button>
      <CreateFumo
        show={fumoVisible}
        onHide={() => setFumoVisible(false)}
      ></CreateFumo>

      <Dropdown className="mt-5 mb-3" style={{ margin: "0 auto" }}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {filter}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {filter === "All" ? (
            <Dropdown.Item disabled>Все</Dropdown.Item>
          ) : (
            <Dropdown.Item onClick={() => setFilter("All")}>Все</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>

      <InputGroup className="mb-3">
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          value={searchFumo}
          onChange={(e) => setSearchFumo(e.target.value)}
          placeholder="Введите имя фумо..."
        />
        <Button onClick={fetchFumo} variant="outline-dark" className="ml-2">
          Поиск
        </Button>
      </InputGroup>

      <ListGroup>
        {searchedFumo &&
          searchedFumo.map(({ id, img, price, name }) => {
            return (
              <ListGroup.Item className="mt-3" key={id}>
                <Row>
                  <Col xs={2}>
                    <Image
                      width={150}
                      src={process.env.REACT_APP_API_URL + img}
                    />
                  </Col>
                  <Col xs={8}>
                    <Row>
                      <Col xs={12}>
                        <NavLink to={FUMO_EDIT_ROUTE + `/${id}`}>
                          id: {id}
                        </NavLink>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12}>Название: {name}</Col>
                    </Row>
                    <Row>
                      <Col xs={12}>Цена: {price}</Col>
                    </Row>
                  </Col>
                  <Col xs={2}>
                    <NavLink to={FUMO_EDIT_ROUTE + `/${id}`}>Изменить</NavLink>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
      </ListGroup>

      <Pagination size="sm" className="mt-4 mb-4" style={{ margin: "0 auto" }}>
        {searchedFumo && searchedFumo.length > 0 ? pages : false}
      </Pagination>
    </Container>
  );
};

export default Admin;
