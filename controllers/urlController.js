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
            createdBy:req.user?._id,
            visitedHistory: [],
        });

         res.redirect('/url/dashboard');

    } catch (error) {
         console.error("Error generating short URL:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

 
const deleteUrlById = async (req, res) => {
    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({ error: "URL ID is required" });
        }
        const deletedUrl = await URL.findByIdAndDelete({_id:id});

        if (!deletedUrl) {
            return res.status(404).json({ error: "URL not found" });
        }
        // res.status(200).json({ message: "URL deleted successfully" })
        return res.redirect("/url/dashboard");
    } catch (error) {
        console.error("Error deleting URL:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { generateNewShortUrl ,deleteUrlById };
