import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

const createUsersModel = (sequelize: Sequelize) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  return Users;
};

export default createUsersModel;
