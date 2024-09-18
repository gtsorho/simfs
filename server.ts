import express, { Request, Response } from 'express';
import path from 'path';
import cors from 'cors';
import sequelize from './server/models';
import bodyParser from 'body-parser';
import userRoutes from './server/routes/user'

const app: express.Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

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
