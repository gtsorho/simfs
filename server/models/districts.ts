import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

const districtsModel = (sequelize: Sequelize) => {
  const Districts = sequelize.define('District', {
    district: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
  });

  return Districts;
};

export default districtsModel;
