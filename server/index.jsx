import express from 'express';
import dotenv from 'dotenv';
import noteRoutes from './routes/noteRoutes.jsx';
import sequelize from './config/db.jsx';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080; //maybe use 5000???

//middleware to parse JSON
app.use(express.json());

//routes
app.use('/api/notes', noteRoutes);

//test DB connection and start server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected...');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });