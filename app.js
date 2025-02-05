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
const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`HTTPS Server is running on port ${port}`);
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = app;