const { Rating, Fumo } = require("./../models/models");

const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
  try {
    const { fumoId } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.KEY);
    const checkRating = await Rating.findOne({
      where: { fumoId, userId: user.id },
    });
    const checkFumos = await Fumo.findOne({ where: { id: fumoId } });

    if (!checkFumos) {
      return res.json("Product doesn't existing in data base");
    } else if (checkRating && checkFumos) {
      return res.json("You have left a rating for this product");
    }
    return next();
  } catch (e) {
    return res
      .status(401)
      .json("Something going wrong in checkAddRatingMiddleware.js");
  }
};
