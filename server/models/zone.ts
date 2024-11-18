import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

const zoneModel = (sequelize: Sequelize) => {
  const Zone = sequelize.define('Zones', {
    zone: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  });

  return Zone;
};

export default zoneModel;
