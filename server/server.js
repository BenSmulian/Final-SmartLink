// Import necessary modules
const express = require('express');
const cors = require('cors'); // Import the CORS module

// Create an instance of the Express application
const app = express();

// Enable CORS for all routes
app.use(cors());

// Define a port for the server to listen on
const PORT = process.env.PORT || 3000;

// Define a URLTable to store shortened URLs
let URLTable = {};

// Define a route to handle URL shortening
app.post('/shorten', (req, res) => {
    // Extract the URL from the request body
    const { url } = req.body;

    // Generate a short code for the URL
    const code = ShortenUrl(url);

    // Store the shortened URL in the URLTable
    URLTable[code] = url;

    // Respond with the generated code
    res.json({
        ok: true,
        code: code
    });
});

// Define a route to handle URL expansion
app.get('/:code', (req, res) => {
    // Extract the code from the request parameters
    const code = req.params.code;

    // Check if the code exists in the URLTable
    const url = URLTable[code];

    if (url) {
        // Redirect to the original URL
        res.redirect(url);
    } else {
        // If the code does not exist, return a 404 error
        res.status(404).json({
            ok: false,
            error: 'URL not found'
        });
    }
});

// Define the function to shorten URLs
function ShortenUrl(url) {
    let letterTable = ["B", "C", "D", "F", "G", "H", "J", "K", "L", 'M', "N", "P", "Q", "R", "S", "T", "V", "X", "Z", "a", "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", 'x', "y", "z"];
    let code = "";

    for (let i = 0; i < 4; i++) {
        code += letterTable[Math.floor(Math.random() * letterTable.length)];
    }

    return code;
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
