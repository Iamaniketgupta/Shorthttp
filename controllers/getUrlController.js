const URL = require("../models/urlSchema")

const getAllUrls = async (req, res) => {

    if(!req.user){
     return res.redirect("/url/login");
    }
    try {
        const user =req.user;
        const result = await URL.find({createdBy:user._id});
        res.render('dashboard.ejs', { result });
    }
    catch (err) {
       res.send({err});
    }

}

module.exports =getAllUrls;