const { Rating, Fumo } = require("./../models/models");
const jwt = require("jsonwebtoken");

class RatingController {
  async addRating(req, res) {
    try {
      const { rate, fumoId } = req.body;
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.KEY);
      await Rating.create({ rate, fumoId, userId: user.id });

      let rating = await Rating.findAndCountAll({
        where: {
          fumoId,
        },
      });

      let allRating = 0;
      let middleRating;
      rating.rows.forEach((item) => (allRating += item.rate));
      middleRating = Number(allRating) / Number(rating.count);

      await Fumo.update({ rate: middleRating }, { where: { id: dfumoId } });

      return res.json("Rating success added");
    } catch (e) {
      console.error(e);
    }
  }

  async checkRating(req, res) {
    try {
      const { fumoId } = req.body;
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, process.env.KEY);
      const checkRating = await Rating.findOne({
        where: { fumoId, userId: user.id },
      });
      const checkFumos = await Fumo.findOne({ where: { id: fumoId } });
      if (!checkFumos) {
        return res.json({ allow: false });
      } else if (checkRating && checkFumos) {
        return res.json({ allow: false });
      }
      return res.json({ allow: true });
    } catch (e) {
      return res
        .status(401)
        .json("Something going wrong in checkAddRatingMiddleware.js");
    }
  }
}

module.exports = new RatingController();
