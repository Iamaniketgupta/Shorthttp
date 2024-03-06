const shortid = require("shortid");
const URL = require("../models/urlSchema");

const generateNewShortUrl = async (req, res) => {
    try {
        const {url} = req.body;
        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }
        
        const shortID = shortid();
        
        await URL.create({
            shortId: shortID,
            redirectUrl: url,
            visitedHistory: [],
        });

         res.redirect('/');

    } catch (error) {
         console.error("Error generating short URL:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { generateNewShortUrl };
