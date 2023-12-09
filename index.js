const express = require('express');
require('dotenv').config();
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const authRoutes = require('./routes/auth');
const auth = require('./middleware/authentication');
const notesRoutes = require('./routes/note');
const app = express();

// security package
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
// middleware
app.use(helmet());
app.use(cors());
app.use(xss());
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(express.json());
// routes
app.get('/', (req, res) => {
  res.send(
    `<a href='https://documenter.getpostman.com/view/31038051/2s9YkgEkY7'>Note-API-docs</a>`
  );
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/', auth, notesRoutes);

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
