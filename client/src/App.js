import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";

import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";

import { Container, Spinner } from "react-bootstrap";
import { Context } from ".";
import { check } from "./http/userAPI";
import { getFumoFromCart } from "./http/fumoAPI";

const App = observer(() => {
  const { user, cart } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      check()
        .then((data) => {
          user.setUser(data);
          user.setIsAuth(true);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user.isAuth === false) {
      cart.setDeleteAllFumoFromCart();
      const savedCart = JSON.parse(localStorage.getItem("cart"));
      for (let key in savedCart) {
        cart.setCart(savedCart[key]);
      }
    } else if (user.isAuth === true) {
      cart.setDeleteAllFumoFromCart();
      getFumoFromCart().then((data) => {
        for (let key in data) {
          cart.setCart(data[key], true);
        }
      });
    }
  }, [cart, user.isAuth]);

  if (loading) {
    return (
      <Spinner
        animation="grow"
        className="d-flex align-items-center justify-content-center"
      />
    );
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Container>
        <AppRouter />
      </Container>
    </BrowserRouter>
  );
});
export default App;
