import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

const countryModel = (sequelize: Sequelize) => {
  const Country = sequelize.define('Country', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Country;
};

export default countryModel;
