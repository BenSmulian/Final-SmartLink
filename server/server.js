// server.js (Backend Server)
// Express server to handle URL shortening requests

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// Placeholder database to store URL mappings
const urlDatabase = {};

// Routes
app.post('/shorten', (req, res) => {
    const longUrl = req.body.longUrl;

    if (!longUrl) {
        return res.status(400).json({ error: 'Missing longUrl in request body' });
    }

    // Generate a unique code for the URL
    const code = generateCode();
    
    // Store the mapping in the database
    urlDatabase[code] = longUrl;

    // Construct the shortened URL
    const shortUrl = 'http://yourdomain.com/' + code;

    // Return the shortened URL
    res.json({ shortUrl: shortUrl });
});

// Generate a random 3-letter code for URL shortening
function generateCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 3; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});

