const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const ejs = require("ejs");
const mongoose = require("mongoose");   

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/rhteDB");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

const userContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const UserContact = new mongoose.model("UserContact", userContactSchema);


app.get("/", function(req, res) {
    res.render("home");
})

app.get("/products", function(req, res) {
    res.render("products");
})

app.post("/", function(req, res) {
    const userContact = new UserContact ({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });

    UserContact.findOne({name: req.body.name}, function(err, foundUser) {
        if(err) {
            console.log(err);
        }
        else {
            userContact.save();
        }
    })
})


app.listen(5000, function() {
    console.log("The Server is live and running on port 5000");
})