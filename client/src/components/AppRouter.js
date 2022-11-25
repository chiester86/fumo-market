import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { Context } from "..";
import { authRoutes, publicRoutes } from "../routes";
import { SHOP_ROUTE } from "../utils/const";

const AppRouter = observer(() => {
  const { user } = useContext(Context);

  return (
    <BrowserRouter>
      {user.isAuth &&
        user.User.role === "ADMIN" &&
        authRoutes.map(({ path, Component }) => {
          return <Route key={path} path={path} element={<Component />} exact />;
        })}
      {publicRoutes.map(({ path, Component }) => {
        return <Route key={path} path={path} element={<Component />} exact />;
      })}
      <Navigate to={SHOP_ROUTE} />
    </BrowserRouter>
  );
});

export default AppRouter;
