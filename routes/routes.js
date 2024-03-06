const { Router } = require("express");
const router = Router();
const { generateNewShortUrl } = require("../controllers/urlController");
const URL = require("../models/urlSchema");

router.post("/generateUrl", generateNewShortUrl);

router.get("/:shortId", async (req, res) => {
    const { shortId } = req.params;
    const foundUrl = await URL.findOneAndUpdate(
        { shortId },
        {
            $push:
                { visitHistory:  { timestamp: Date.now() } }
        });

    res.redirect(foundUrl.redirectUrl);
});

module.exports = router;

