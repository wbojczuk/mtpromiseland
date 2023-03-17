const express = require("express");
const router = express.Router();
const data = {};
const fs = require("fs");
data.blogs = require("./blogs.json");

function idExists(id){
    let retval = false;
    data.blogs.forEach((blog)=>{
        if(blog.id == id){
            retval = true;
        }
    })
    return retval
}

function saveBlogs(){
    fs.writeFile("./api/blogs.json", JSON.stringify(data.blogs), (err)=>{if(err){console.log(err); res.status = 503;}})
}

router.route("/blogs")
.get((req, res)=>{
    res.json(data.blogs);
})
.post((req, res)=>{
    if(req.user){
        const sentData = req.body;
        // Validate Properties Are there
        if(sentData.title && sentData.id && sentData.content && sentData.description){
            if(!idExists(sentData.id)){
                const newBlog = {id: sentData.id, title: sentData.title, description: sentData.description, content: sentData.content};
                data.blogs.push(newBlog);
                saveBlogs();
                res.status = 200;
        res.send("Completed")
            }else{
                res.status = 409;
            }
        }else{
            res.status = 406;
        }
    }else{
        res.json({"Error": "You need to be logged in to perform this action."})
        res.status = 406;
    }
    
})

module.exports = router;