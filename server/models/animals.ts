import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

const animalsModel = (sequelize: Sequelize) => {
  const Animals = sequelize.define('Animals', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('small-ruminant','large-ruminant', 'monogastric', 'poultry'),
      allowNull: false,
    },
    threshold: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
  });

  return Animals;
};

export default animalsModel;
