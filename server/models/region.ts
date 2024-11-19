import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

const regionModel = (sequelize: Sequelize) => {
  const Region = sequelize.define('Regions', {
    region: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  })

  return Region;
};

export default regionModel;
