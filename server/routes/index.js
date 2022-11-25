const Router = require("express");
const router = new Router();
const fumoRouter = require(".//fumoRouter");
const userRouter = require(".//userRouter");
const cartRouter = require(".//cartRouter");
const ordersRouter = require(".//ordersRouter");
const ratingRouter = require("./ratingRouter");

router.use("/user", userRouter);
router.use("/fumo", fumoRouter);
router.use("/cart", cartRouter);
router.use("/orders", ordersRouter);
router.use("/rating", ratingRouter);

module.exports = router;
