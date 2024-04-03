// pages/api/shorten.js

// Define the function to shorten URLs
function ShortenUrl(url) {
    const letterTable = ["B", "C", "D", "F", "G", "H", "J", "K", "L", 'M', "N", "P", "Q", "R", "S", "T", "V", "X", "Z", "a", "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", 'x', "y", "z"];
    let code = "";

    for (let i = 0; i < 4; i++) {
        code += letterTable[Math.floor(Math.random() * letterTable.length)];
    }

    return code;
}

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const code = ShortenUrl(url);

        return res.status(200).json({ ok: true, code });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}
