import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

const farmerModel = (sequelize: Sequelize) => {
  const Farmer = sequelize.define('Farmer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notify: {
      type: DataTypes.BOOLEAN,
      defaultValue:false,
      allowNull: false,
    },
    household_size: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_trees: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_economic_trees: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Farmer;
};

export default farmerModel;
