import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

const cropModel = (sequelize: Sequelize) => {
  const Crops = sequelize.define('Crops', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('crop'),
        defaultValue:'crop',
        allowNull: false,
    },
    threshold: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
  });

  return Crops;
};

export default cropModel;
