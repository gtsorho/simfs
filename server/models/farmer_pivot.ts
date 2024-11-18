import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

const farmerPivotModel = (sequelize: Sequelize) => {
  const Farmer_Pivot = sequelize.define('Farmer_Pivot', {
    no_crops: {
      type: DataTypes.INTEGER, 
      allowNull: true,
    },
    no_animals: {
      type: DataTypes.INTEGER, 
      allowNull: true,
    },
  });

  return Farmer_Pivot;
};

export default farmerPivotModel;
