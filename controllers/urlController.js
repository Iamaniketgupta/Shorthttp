const shortid = require("shortid");
const URL = require("../models/urlSchema");

const generateNewShortUrl = async (req, res) => {
    try {
        const {url} = req.body;
        console.log(req.user)
        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }
        
        const shortID = shortid();
        
        await URL.create({
            shortId: shortID,
            redirectUrl: url,
            createdBy:req.user?._id,
            visitedHistory: [],
        });

         res.redirect('/url/dashboard');

    } catch (error) {
         console.error("Error generating short URL:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { generateNewShortUrl };
