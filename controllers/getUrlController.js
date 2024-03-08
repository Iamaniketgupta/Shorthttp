const URL = require("../models/urlSchema")

const getAllUrls = async (req, res) => {

    try {
        
        if(!req.user) res.redirect("/url/login");
        const user =req.user;
        const result = await URL.find({createdBy:user._id});
        res.render('dashboard.ejs', { result });
    }
    catch (err) {
       res.send({err});
    }

}

module.exports =getAllUrls;