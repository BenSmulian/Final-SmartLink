const express = require('express');
const cors = require('cors');
const http = require('http');
const net = require('net');

const app = express();
const port = process.env.PORT || 1337;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let URLTable = {};

app.post('/*', (req, res) => {
    const { Action, url } = req.body;

    if (Action === "Set") {
        const code = ShortenUrl(url);
        return res.status(200).json({
            ok: true,
            data: code
        });
    } else if (Action === "Get") {
        const code = URLTable[url];
        return res.status(200).json({
            ok: true,
            data: code
        });
    } else {
        return res.status(400).json({
            ok: false,
            error: 'Invalid Action value'
        });
    }
});

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
});

function ShortenUrl(url) {
    let letterTable = ["B", "C", "D", "F", "G", "H", "J", "K", "L", 'M', "N", "P", "Q", "R", "S", "T", "V", "X", "Z", "a", "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", 'x', "y", "z"];
    let code = "";

    for (let i = 0; i < 4; i++) {
        code += letterTable[Math.floor(Math.random() * letterTable.length)];
    }

    URLTable[code] = url;

    console.log(URLTable);
    return code;
}

// TCP server setup
const ip = '192.168.1.13';
const ipPort = 8000;
const opPort = 7000;

const input = net.createServer(function (connIn) {
    connIn.on('data', (data) => {
        // Handle incoming data here
        console.log(data.toString());
    });
});
input.listen(ipPort, ip);

const output = net.createServer(function (connOut) {
    connOut.on('data', (data) => {
        // Write data received from connOut to input server
        input.getConnections((err, count) => {
            if (err) {
                console.error('Error getting connections:', err);
                return;
            }
            if (count > 0) {
                // Forward data to input server
                input.getConnections((err, sockets) => {
                    if (err) {
                        console.error('Error getting connections:', err);
                        return;
                    }
                    for (const socket of sockets) {
                        socket.write(data);
                    }
                });
            } else {
                console.log('No connections to forward data to.');
            }
        });
    });
});
output.listen(opPort, ip);
