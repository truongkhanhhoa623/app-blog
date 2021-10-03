const express = require("express");
const app = express();
const router = require("./routes");
const path = require("path");

//middleware
const cookieParser = require("cookie-parser");
const session = require("express-session");
const cookieCheck = require("./middlewares/cookieChecker");
const methodOverride = require("method-override");

//handlebars
const handlebars = require("express-handlebars");
const dateFormat = require("handlebars-dateformat");
const { sliceString } = require("./helper/handlebars");

//PORT
const PORT = process.env.PORT || 4000;

//connect to database mongodb
const database = require("./config/db");
database.connect();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

//init cookieParser
app.use(cookieParser());
// init session
app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

//set engine handlebars
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));
app.engine(
  "hbs",
  handlebars({
    defaultLayout: "main",
    extname: "hbs",
    helpers: {
      sliceString,
      dateFormat,
    },
  })
);

//check cookie
app.use(cookieCheck);

app.use(methodOverride("_method"));

//Set variables locals for  user login
app.use((req, res, next) => {
  res.locals.userLogin = req.session.user;
  next();
});
//Config all router
router(app);

app.listen(PORT, () => console.log(`App listening post ${PORT}`));
