import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

const activitiesModel = (sequelize: Sequelize) => {
  const Activities = sequelize.define('Activities', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  });

  return Activities;
};

export default activitiesModel;
