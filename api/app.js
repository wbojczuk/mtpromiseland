const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const path = require("path");
const session = require("express-session");
const passport = require("passport");

const whitelist = ["http://localhost", "http://localhost:5173", "http://localhost:3000"];
const corsOptions = {
    origin: (origin, callback)=>{
        if(whitelist.includes(origin) || !origin){
            callback(null, true);
        }else{
            callback(new Error("CORS Not Supported"));
        }
    }
};

app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  }));
  
app.use(passport.authenticate('session'));

app.use("/login", require("./auth/login.js"));
app.use("/dashboard", require("./secure/dashboard.js"))
app.use("/api", require("./api/api.js"));

// SERVING THE STATIC FRONTEND
app.use(express.static("public"));
// app.get("^/$|index(.html)?", (req, res)=>{
//     res.sendFile(path.join(__dirname, "public" , "index.html"));
// })

// SERVING THE STATIC ADMIN PANEL
app.use(express.static("secure"));


app.listen(PORT);