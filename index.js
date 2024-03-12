const express =require("express");
const ejs =require("ejs");
const path = require("path");
const app =express();
require("dotenv").config();
const cookieParser = require('cookie-parser')
const router =require("./routes/routes");
const dbConnect= require("./util/dbconfig");
const getAllUrls = require("./controllers/getUrlController");
const PORT =process.env.PORT || 8000;

app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.set("view engine",ejs);

dbConnect();

app.use(express.static(path.join(__dirname, 'public')));
app.set("views",path.resolve("./views"));

app.use("/url",router); 

app.get("/",(req,res)=>res.render("home.ejs"));

app.listen(PORT);