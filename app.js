const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config(); 
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.use('/billioneye', express.static(path.join(__dirname, 'build')));

app.get('/billioneye/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`HTTPS Server is running on port ${port}/billioneye`);
});

module.exports = app;
