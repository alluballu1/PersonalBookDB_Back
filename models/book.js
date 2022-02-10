'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User, {foreignKey:"uuid"})
    }
    toJSON() {
      return{...this.get(), id:undefined, userId:undefined}
    }
  }
  Book.init({
    name: {type:DataTypes.STRING, allowNull:false, unique:true},
    bookId: DataTypes.UUID,
    pubYear: DataTypes.INTEGER,
    genres: DataTypes.ARRAY(Sequelize.STRING)
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};