'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  projects.init({
    user_id: DataTypes.INTEGER,
    author: DataTypes.STRING,
    projectname: DataTypes.STRING,
    startdate: DataTypes.DATE,
    enddate: DataTypes.DATE,
    desc: DataTypes.STRING,
    nodejs: DataTypes.BOOLEAN,
    javascript: DataTypes.BOOLEAN,
    reactjs: DataTypes.BOOLEAN,
    android: DataTypes.BOOLEAN,
    duration: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'projects',
  });
  return projects;
};