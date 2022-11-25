const Sequelize = require(`sequelize`);
const sequelize = require(`../db`);

const { DataTypes } = require(`sequelize`);

const User = sequelize.define(`user`, {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Cart = sequelize.define(`cart`, {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Cart_fumo = sequelize.define(`cart_fumo`, {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Fumo = sequelize.define(`fumo`, {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Rating = sequelize.define(`rating`, {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const Fumo_info = sequelize.define(`fumo_info`, {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

const Orders = sequelize.define("orders", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  complete: { type: DataTypes.BOOLEAN, defaultValue: false },
  mobile: { type: DataTypes.STRING(25), allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: true },
});

const OrderFumo = sequelize.define("order_fumo", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fumoId: { type: DataTypes.INTEGER, allowNull: false },
  orderId: { type: DataTypes.INTEGER, allowNull: false },
  count: { type: DataTypes.INTEGER, allowNull: false },
});

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

User.hasMany(Orders);
Orders.belongsTo(User, {
  foreignKey: { name: "userId" },
  onDelete: "CASCADE",
});

Orders.hasMany(OrderFumo);
OrderFumo.belongsTo(Orders, {
  foreignKey: { name: "orderId" },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Cart.hasMany(Cart_fumo);
Cart_fumo.belongsTo(Cart);

Fumo.hasMany(Rating);
Rating.belongsTo(Fumo);

Fumo.hasMany(Cart_fumo);
Cart_fumo.belongsTo(Fumo);

Fumo.hasMany(Fumo_info, { as: "info" });
Fumo_info.belongsTo(Fumo);

module.exports = {
  User,
  Cart,
  Cart_fumo,
  Rating,
  Fumo,
  Fumo_info,
  Orders,
  OrderFumo,
};
