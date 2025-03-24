const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const app = require('./app');

const port = process.env.PORT || 5000;

// Load SSL/TLS certificates
const options = {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')), // Path to private key
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')), // Path to certificate
};

// Create HTTPS server
const server = https.createServer(options, app);

// Start the HTTPS server
server.listen(port, () => {
    console.log(`HTTPS Server is running on port ${port}`);
});

// Optional: Redirect HTTP to HTTPS
http.createServer((req, res) => {
    const httpsUrl = `https://${req.headers.host}${req.url}`;
    res.writeHead(301, { Location: httpsUrl }); // Redirect to HTTPS
    res.end();
})


