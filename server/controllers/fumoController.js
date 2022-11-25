const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/ApiError");

const { Fumo, Fumo_info } = require("../models/models");

class FumoController {
  async create(req, res, next) {
    try {
      let { name, price, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const fumo = await Fumo.create({ name, price, img: fileName });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) => {
          Fumo_info.create({
            title: i.title,
            description: i.description,
            fumoId: fumo.id,
          });
        });
      }

      return res.json(fumo);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { limit, page } = req.query;
    page = page || 1;
    // __________________
    limit = limit || 100;
    // __________________
    let offset = page * limit - limit;
    let fumos;
    fumos = await Fumo.findAndCountAll({ limit, offset });
    return res.json(fumos);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const fumo = await Fumo.findOne({
      where: { id },
      include: { model: Fumo_info, as: "info" },
    });
    return res.json(fumo);
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await Fumo.findOne({ where: { id } }).then(async (data) => {
        if (data) {
          await Fumo.destroy({ where: { id } }).then(() => {
            return res.json("Fumo deleted");
          });
        } else {
          return res.json("This fumo doesn't exist");
        }

        await CartDevice.destroy({ where: { fumoId: id } });
      });
    } catch (e) {
      return res.json(e);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, price, info } = req.body;

      await Fumo.findOne({ where: { id } }).then(async (data) => {
        if (data) {
          let newVal = {};
          name ? (newVal.name = name) : false;
          price ? (newVal.price = price) : false;

          if (req.files) {
            const { img } = req.files;
            const type = img.mimetype.split("/")[1];
            let fileName = uuid.v4() + `.${type}`;
            img.mv(path.resolve(__dirname, "..", "static", fileName));
            newVal.img = fileName;
          }

          if (info) {
            const parseInfo = JSON.parse(info);
            for (const item of parseInfo) {
              await DeviceInfo.findOne({ where: { id: item.id } }).then(
                async (data) => {
                  if (data) {
                    await Fumo_info.update(
                      {
                        title: item.title,
                        description: item.description,
                      },
                      { where: { id: item.id } }
                    );
                  } else {
                    await Fumo_info.create({
                      title: item.title,
                      description: item.description,
                      fumoId: id,
                    });
                  }
                }
              );
            }
          }

          await Fumo.update(
            {
              ...newVal,
            },
            { where: { id } }
          ).then(() => {
            return res.json("Fumo updated");
          });
        } else {
          return res.json("This fumo doesn't exist");
        }
      });
    } catch (e) {
      return res.json(e);
    }
  }
}

module.exports = new FumoController();
