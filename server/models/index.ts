import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import user from './user';


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

db.user = user(sequelize);


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

export default db;
