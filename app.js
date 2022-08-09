const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const connectDB = require("./config/db");

//LOAD CONFIG
dotenv.config({ path: "./config/config.env" });

// PASSPORT CONFIG

require("./config/passport")(passport);

connectDB();

const app = express();

// LOGGING - MORGAN
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// HANDLEBARS
app.engine(
    ".hbs",
    exphbs.engine(
        //Add engine after exphbs or it will throw an error
        {
            defaultLayout: "main",
            extname: ".hbs",
        }
    )
);
app.set("view engine", ".hbs");

// SESSIONS MIDDLEWARE
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
    })
);

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

// STATIC FOLDER
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5050;
app.listen(
    PORT,
    console.log(`Running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
