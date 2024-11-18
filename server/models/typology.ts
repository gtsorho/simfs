import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

const typologyModel = (sequelize: Sequelize) => {
  const Typology = sequelize.define('Typology', {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    household_size: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    livestock_diversity: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    crop_yield: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    parcel_of_land: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    land_size:{
      type:DataTypes.FLOAT,
      allowNull:false
    },
    livestock_holding:{
      type:DataTypes.FLOAT,
      allowNull:false
    },
    no_trees:{
      type:DataTypes.FLOAT,
      allowNull:false
    },
    no_economic_trees:{
      type:DataTypes.FLOAT,
      allowNull:false
    }
  });

  return Typology;
};

export default typologyModel;
