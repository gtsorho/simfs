import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

const districtsModel = (sequelize: Sequelize) => {
  const Districts = sequelize.define('District', {
    district: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    shape_length: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    shape_area: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    geometry: {
      type: DataTypes.GEOMETRY,
      allowNull: true
    }
  });

  return Districts;
};

export default districtsModel;
