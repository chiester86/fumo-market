import React, { useState, useContext } from "react";
import { Row, Button, Card, Container, Form } from "react-bootstrap";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/const";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { registration, login_ } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { SHOP_ROUTE } from "../utils/const";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login_(login, password);
      } else {
        data = await registration(login, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: "600px" }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Вход" : "Регистрация"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="Введите логин..."
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          ></Form.Control>
          <Form.Control
            className="mt-3"
            placeholder="Введите пароль..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          ></Form.Control>
          <Row className="d-flex justify-content-around mt-3 pl-3 pr-3">
            {isLogin ? (
              <div>
                <NavLink to={REGISTRATION_ROUTE} style={{ color: "#34c0eb" }}>
                  Зарегистрироваться
                </NavLink>
              </div>
            ) : (
              <div>
                <NavLink to={LOGIN_ROUTE} style={{ color: "#34c0eb" }}>
                  Войти
                </NavLink>
              </div>
            )}
            <Button
              variant="outline-light"
              style={{
                color: "#34c0eb",
                borderColor: "#34c0eb",
              }}
              className="mt-3"
              onClick={click}
            >
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
