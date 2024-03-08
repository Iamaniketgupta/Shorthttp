const { Router } = require("express");
const router = Router();
const { generateNewShortUrl } = require("../controllers/urlController");
const URL = require("../models/urlSchema");
const { handleSignup, handleLogin } = require("../controllers/userController");
const { validateLoggedUser, checkAuth } = require("../middlewares/auth");
const getAllUrls = require("../controllers/getUrlController");

router.post("/generateUrl",validateLoggedUser,generateNewShortUrl);

router.get("/signup", (req, res) => {
    res.render('signup.ejs');
});
router.get("/login", (req, res) => {
    res.render('login.ejs');
});
router.post("/signup", handleSignup);
router.post("/login", handleLogin);

router.get("/dashboard",checkAuth, getAllUrls);

router.get("/s/:shortId", async (req, res) => {
    const { shortId } = req.params;
    const foundUrl = await URL.findOneAndUpdate(
        { shortId },
        {
            $push:
                { visitHistory: { timestamp: Date.now() } }
        });

    res.redirect(foundUrl.redirectUrl);
});





module.exports = router;

