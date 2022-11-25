import Admin from "./pages/Admin";
import Orders from "./pages/Order";
import CartCard from "./pages/CartCard";
import OneOrder from "./pages/OneOrder";
import Ordering from "./pages/Ordering";
import Shop from "./pages/Shop";
import FumoPage from "./pages/FumoPage";
import FumoEditPage from "./pages/FumoEditPage";
import Auth from "./pages/Auth";
import {
  ADMIN_ROUTE,
  CART_ROUTE,
  SHOP_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  FUMO_ROUTE,
  FUMO_EDIT_ROUTE,
  ORDERING_ROUTE,
  ORDERS_ROUTE,
} from "./utils/const";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: ORDERS_ROUTE,
    Component: Orders,
  },
  {
    path: ORDERS_ROUTE + "/:id",
    Component: OneOrder,
  },

  {
    path: FUMO_EDIT_ROUTE + "/:id",
    Component: FumoEditPage,
  },
];

export const publicRoutes = [
  {
    path: ORDERING_ROUTE,
    Component: Ordering,
  },
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: FUMO_ROUTE + "/:id",
    Component: FumoPage,
  },
  {
    path: CART_ROUTE,
    Component: CartCard,
  },
];
