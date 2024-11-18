import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import sequelize from './server/models';
import bodyParser from 'body-parser';
import userRoutes from './server/routes/user'
import animalsRoutes from './server/routes/animals'
import cropRoutes from './server/routes/crop'
import farmerRoutes from './server/routes/farmer'
import typologyRoutes from './server/routes/typology'
import systemRoutes from './server/routes/system'
import ZoneRoutes from './server/routes/zone'
import ActivityRoutes from './server/routes/activities'
import nuggetRoute from './server/routes/nuggets'

const app: express.Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/animals', animalsRoutes);
app.use('/api/farmers', farmerRoutes);
app.use('/api/typologies', typologyRoutes);
app.use('/api/systems', systemRoutes);
app.use('/api/zone', ZoneRoutes);
app.use('/api/activity', ActivityRoutes);
app.use('/api/nuggets', nuggetRoute);


// app.post('/api/test', (req:Request, res:Response)=>{
//   console.log(req.body)
// })

const angularDistDir = path.join(__dirname, '../ui/dist/mfs-project/browser');

app.use(express.static(angularDistDir));

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(angularDistDir, 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', async () => {
  console.log('Closing database connection...');
  await sequelize.close();
  console.log('Database connection closed.');
  process.exit(0);
});
