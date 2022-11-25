const { Cart, Cart_fumo } = require("./../models/models");
const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  try {
    const { id } = req.params;
    const user = req.user;
    const userCart = await Cart.findOne({ where: { userId: user.id } });
    const fumoItem = await Cart_fumo.findOne({
      where: { cartId: userCart.id, fumoId: id },
    });

    if (fumoItem) {
      return next();
    }
    return res.json("Device didn't find in basket of user");
  } catch (e) {
    res.json(e);
  }
};
