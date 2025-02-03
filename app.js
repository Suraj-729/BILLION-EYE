const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
dotenv.config(); 
const cors = require('cors');
// const connectToDb = require('./Db/db')
// const userRoutes = require('./routes/user.routes');

// connectToDb();
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieparser());

// app.use('/user', userRoutes);
// app.use('/images', imageRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = app;