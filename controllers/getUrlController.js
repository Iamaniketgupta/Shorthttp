const URL = require("../models/urlSchema")

const getAllUrls = async (req, res) => {

    try {
        const result = await URL.find({});
        console.log(result);
        res.render('home.ejs', { result });
    }
    catch (err) {
        res.render("home.ejs");
    }

}

module.exports =getAllUrls;