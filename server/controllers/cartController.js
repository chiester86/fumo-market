const { Cart, Cart_fumo, Fumo, Fumo_info } = require("./../models/models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

class CartController {
  async addFumo(req, res) {
    try {
      const { id } = req.body;
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.KEY);
      const cart = await Cart.findOne({ where: { userId: user.id } });
      await Cart_fumo.create({ cartId: cart.id, fumoId: id });
      return res.json("Product added in card");
    } catch (e) {
      console.error(e);
    }
  }

  async getFumo(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.KEY);
      const { id } = await Cart.findOne({ where: { userId: user.id } });
      const cart = await Cart_fumo.findAll({ where: { fumoId: id } });

      const cartArr = [];
      for (let i = 0; i < cart.length; i++) {
        const cartFumo = await Fumo.findOne({
          where: {
            id: fumo[i].fumoId,
          },
          include: {
            model: Fumo_info,
            as: "info",
            where: {
              fumoId: cart[i].fumoId,
              [Op.or]: [
                {
                  fumoId: {
                    [Op.not]: null,
                  },
                },
              ],
            },
            required: false,
          },
        });
        cartArr.push(cartFumo);
      }

      return res.json(cartArr);
    } catch (e) {
      console.error(e);
    }
  }

  async deleteFumo(req, res) {
    try {
      const { id } = req.params;
      const user = req.user;

      await Cart.findOne({ where: { userId: user.id } }).then(
        async (userCart) => {
          if (userCart.userId === user.id) {
            await Cart_fumo.destroy({
              where: { cartId: userCart.id, fumoId: id },
            });
          }
          return res.json(
            `You haven't access for delete the device(${id}) from basket that didn't belong to you`
          );
        }
      );
      return res.json("Product deleted form your card");
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = new CartController();
