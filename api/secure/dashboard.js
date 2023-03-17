const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req,res)=>{
    if(req.user){
        res.sendFile(path.join(__dirname, ".." , "/secure/dashboard/dashboard.html"));
    }else{
        res.redirect("/login");
    }
    
})

module.exports = router;