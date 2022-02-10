"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Book}) {
      // define association here

      
      this.hasMany(Book, {foreignKey:"uuid"})
    }
    toJSON() {
      return {...this.get(), id:undefined}
    }
  }
  User.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      userId: { type: DataTypes.UUID, primaryKey: true },
      passwordHash: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    }
  );
  return User;
};
