'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  project.init({
    projectname: DataTypes.STRING,
    startdate: DataTypes.DATE,
    enddate: DataTypes.DATE,
    desc: DataTypes.STRING,
    nodejs: DataTypes.BOOLEAN,
    reactjs: DataTypes.BOOLEAN,
    javascript: DataTypes.BOOLEAN,
    android: DataTypes.BOOLEAN,
    duration: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'project',
  });
  return project;
};