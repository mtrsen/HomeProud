var express    = require("express"),
    app        = express(), 
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    User       = require("./models/users"),
    seedDB     = require("./seeds"),
    passport   = require("passport"),
    override   = require("method-override"),
    LocalStrategy = require("passport-local"),
    flash      = require("connect-flash");
// requiring routes from different routes   
var commentRoutes    = require("./routes/comments"),
    hometownRoutes = require("./routes/hometowns"),
    indexRoutes      = require("./routes/index");
// populate sample seeds    
//seedDB();
mongoose.connect(process.env.DATABASEURL);
//mongodb://localhost/yelp_camp
// "mongodb://hansen:9393ZHSzhs@ds153494.mlab.com:53494/homeproud"
app.use(express.static(__dirname + "/public"));

// passport configuration
app.use(require("express-session")({
    secret: "This is my full-stack project!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// use body parser
app.use(bodyParser.urlencoded({extended: true}));
// use method-override 
app.use(override("_method"));
// include all the ejs files without ".ejs"
app.set("view engine", "ejs");

app.use(flash());
app.use(function(req, res, next){
    res.locals.user = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next(); 
});

// use routes
app.use(indexRoutes);
app.use(hometownRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The HomeProud server has started!");
});