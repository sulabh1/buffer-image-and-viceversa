'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Buffer_Upload extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Buffer_Upload.init({
    picName: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'Buffer_Upload',
  });
  return Buffer_Upload;
};