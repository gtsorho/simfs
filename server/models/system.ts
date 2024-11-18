import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

const systemModel = (sequelize: Sequelize) => {
  const Farm_systems = sequelize.define('Farm_systems', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  

  return Farm_systems;
};

export default systemModel;
