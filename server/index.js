const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { default: mongoose } = require('mongoose');

const UserRoute = require('./routes/User.route')

const AuthRouter = require('./routes/auth.route')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });







app.use('/api/user', UserRoute);

app.use('/api/auth', AuthRouter);



app.listen(4000, () => {
  console.log('server is running on port 4000');
});
