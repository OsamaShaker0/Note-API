const express = require('express');
require('dotenv').config();
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const authRoutes = require('./routes/auth');
const auth = require('./middleware/authentication');
const notesRoutes = require('./routes/note')
const app = express();
app.use(express.json());

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/', auth,notesRoutes);

// middlewares
app.use(notFound);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}....`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
