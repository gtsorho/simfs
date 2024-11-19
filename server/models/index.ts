import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import user from './user';
import animalsModel from './animals';
import cropModel from './crop';
import farmerModel from './farmer';
import systemModel from './system';
import farmerPivotModel from './farmer_pivot';
import typologyModel from './typology';
import countryModel from './country';
import regionModel from './region';
import districtsModel from './districts';
import zoneModel from './zone';
import activitiesModel from './activities';
import nuggetsModel from './nuggets';


dotenv.config();

const sequelize = new Sequelize(
    process.env.DATABASE!, 
    process.env.DB_USERNAME!, 
    process.env.DB_PASSWORD!, 
    {
        host: process.env.DB_HOST!,
        port: parseInt(process.env.DB_PORT!),
        dialect: 'mysql',
        logging: false
    }
);

const db: any = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.user = user(sequelize)
db.crop = cropModel(sequelize)
db.system = systemModel(sequelize)
db.farmer = farmerModel(sequelize)
db.animal = animalsModel(sequelize)
db.farmer_pivot = farmerPivotModel(sequelize)
db.typology = typologyModel(sequelize)
db.country = countryModel(sequelize)
db.region = regionModel(sequelize)
db.district = districtsModel(sequelize)
db.zone = zoneModel(sequelize)
db.activity = activitiesModel(sequelize)
db.nugget = nuggetsModel(sequelize)


db.farmer.belongsToMany(db.system, { through: db.farmer_pivot });
db.system.belongsToMany(db.farmer, { through: db.farmer_pivot });

db.zone.hasMany(db.farmer)
db.farmer.belongsTo(db.zone)

db.farmer.hasMany(db.farmer_pivot)
db.farmer_pivot.belongsTo(db.farmer)

db.farmer_pivot.belongsTo(db.crop) 
db.crop.hasMany(db.farmer_pivot)

db.farmer_pivot.belongsTo(db.animal) 
db.animal.hasMany(db.farmer_pivot)

db.farmer_pivot.belongsTo(db.typology) 
db.typology.hasMany(db.farmer_pivot)

db.farmer_pivot.belongsTo(db.system) 
db.system.hasMany(db.farmer_pivot)

db.country.hasMany(db.region)
db.region.belongsTo(db.country)

db.region.hasMany(db.farmer)
db.farmer.belongsTo(db.region)

db.region.hasMany(db.district)
db.district.belongsTo(db.region)

db.zone.hasMany(db.region)
db.region.belongsTo(db.zone)

db.zone.hasMany(db.district)
db.district.belongsTo(db.zone);

db.system.belongsToMany(db.activity, { through: 'SystemActivities' });
db.activity.belongsToMany(db.system, { through: 'SystemActivities' });

db.activity.hasMany(db.nugget)
db.nugget.belongsTo(db.activity);


sequelize.sync({alter: true, force: false})
.then(() => {
    console.log('All data in sync');
})
.catch((error: any) => {
    console.error('Unable to sync the database:', error);
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error: any) => {
    console.error('Unable to connect to the database:', error);
});

export default db