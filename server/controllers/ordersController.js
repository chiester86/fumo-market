const { Orders, OrderFumo, Fumo } = require("./../models/models");
const ApiError = require("../error/apiError");
const jwt = require("jsonwebtoken");

class OrdersController {
  async create(req, res) {
    const auth = req.headers.authorization || "";
    const { mobile, cart } = req.body;

    try {
      let parseFumo = [];
      for (let key of cart) {
        parseFumo.push(key.id);
      }

      const isFumoInDB = await Fumo.findAndCountAll({
        where: { id: parseFumo },
        attributes: ["id"],
      });

      if (isFumoInDB.count === parseFumo.length) {
        const row = { mobile };
        if (auth) {
          const token = auth.split(" ")[1];
          const { id } = jwt.verify(token, process.env.KEY);
          row.userId = id;
        }

        await Orders.create(row).then((order) => {
          const { id } = order.get();
          parseFumo.forEach(async (fumoId, i) => {
            await OrderFumo.create({
              orderId: id,
              deviceId,
              count: cart[i].count,
            });
          });
        });
      } else {
        const notFoundIdFumo = [];
        const arrFumo = []; //found id
        isFumoInDB.rows.forEach((item) => arrFumo.push(item.id));
        parseFumo.forEach((fumoId) => {
          if (!arrFumo.includes(fumoId)) {
            notFoundIdFumo.push(fumoId);
          }
        });
        return ApiError.badRequest(
          res.json(
            `Some fumos of id(${notFoundIdFumo.join(", ")}) not exist in DB`
          )
        );
      }

      return res.json("Спасибо за деньги, приходите ещё");
    } catch (e) {
      return res.json(e);
    }
  }

  async updateOrder(req, res) {
    try {
      const { complete, id } = req.body;

      await Orders.findOne({ where: { id } }).then(async (data) => {
        if (data) {
          await Orders.update({ complete }, { where: { id } }).then(() => {
            return res.json("Order updated");
          });
        } else {
          return res.json("This order doesn't exist in DB");
        }
      });
    } catch (e) {
      return res.json("Updated didn't complete because was error: " + e);
    }
  }

  async deleteOrder(req, res) {
    try {
      const { id } = req.body;

      await Orders.findOne({ where: { id } }).then(async (data) => {
        if (data) {
          await Orders.destroy({ where: { id } }).then(() => {
            return res.json("Order deleted");
          });
        } else {
          return res.json("This order doesn't exist in DB");
        }
      });
    } catch (e) {
      return res.json("Delete didn't complete because was error: " + e);
    }
  }

  async getAll(req, res) {
    let { limit, page, complete } = req.query;
    page = page || 1;
    limit = limit || 7;
    let offset = page * limit - limit;
    let fumos;
    if (complete === "not-completed") {
      fumos = await Orders.findAndCountAll({
        where: { complete: false },
        limit,
        offset,
      });
    } else if (complete === "completed") {
      fumos = await Orders.findAndCountAll({
        where: { complete: true },
        limit,
        offset,
      });
    } else {
      fumos = await Orders.findAndCountAll({ limit, offset });
    }

    return res.json(fumos);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const order = {};
    try {
      let fumo;
      let infoFumo = [];
      await Orders.findOne({ where: { id } })
        .then(async (data) => {
          order.descr = data;
          fumo = await OrderFumo.findAll({
            attributes: ["fumoId", "count"],
            where: { orderId: data.id },
          });

          for (let fumo of fumo) {
            await Fumo.findOne({
              attributes: ["name", "img", "price"],
              where: { id: fumo.fumoId },
            }).then(async (item) => {
              let newObj = {
                descr: item,
                count: fumo.count,
              };
              infoFumo.push(newObj);
            });
          }
          order.fumo = infoFumo;

          return res.json(order);
        })
        .catch(() => {
          return res.json("Order doesn't exist in data base");
        });
    } catch (e) {
      return res.json("Delete didn't complete because was error: " + e);
    }
  }
}

module.exports = new OrdersController();
