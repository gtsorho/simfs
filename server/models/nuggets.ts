import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

const nuggetsModel = (sequelize: Sequelize) => {
  const Nuggets = sequelize.define('Nuggets', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    msg: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  });

  return Nuggets;
};

export default nuggetsModel;
