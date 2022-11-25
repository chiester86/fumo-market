const Router = require("express");
const router = new Router();
const CartController = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");
const checkDeleteFumoFromCart = require("../middleware/checkDeleteFumoFromCart");

router
  .post("/", authMiddleware, CartController.addFumo)
  .get("/", authMiddleware, CartController.getFumo)
  .delete(
    "/:id",
    authMiddleware,
    checkDeleteFumoFromCart,
    CartController.deleteFumo
  );

module.exports = router;
