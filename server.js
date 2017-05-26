//requireds
var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    hbs = require("hbs"),
    mongoose = require("mongoose"),
    bcrypt = require("bcrypt-nodejs"),
    passport = require("passport"),
    User = require("./user"),
    localAuth = require("./auth"),
    session = require("express-session");

//veiw engin
app.set("view engine", "hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'issaSecret',
    resave: true, 
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

localAuth(passport);

//routs
app.get("/", function(req, res){
    res.render("index");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.get("/signup", function(req, res){
    res.render("signup");
});

//post routs

app.post("/login", passport.authenticate("local-login", {
    successRedirect: "/user"
    failure Redirect: "/login"
}));

app.post("/signup", function(req, res){
    new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password)
    }).save(function(err){
        if(err){
            console.log(err);
        } else{
            res.redirect("/login");
        }
    });
});

app.get("/user", function(req, res){
    res.render("user", {
        user: req.user
    });
});

// connects to database
mongoose.connect("mongodb://localhost/user");

// makes server
app.listen(8080);
console.log("Server is running");