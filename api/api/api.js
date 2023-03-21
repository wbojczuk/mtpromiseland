const express = require("express");
const router = express.Router();
const data = {};
const fs = require("fs");
const path = require("path");
const fspromise = require("fs/promises")
data.blogs = require("./blogdata.json");

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
    fs.writeFile("./api/blogdata.json", JSON.stringify(data.blogs), (err)=>{if(err){console.log(err); res.status = 503;}})
}

router.route("/blogs")
.get((req, res)=>{
    res.json(data.blogs);
})
.post(async (req, res)=>{
    if(req.user){
        const sentData = req.body;
        // Validate Properties Are there
        if(sentData.title && sentData.id && sentData.content && sentData.description, sentData.tags){
            if(!idExists(sentData.id)){

                // GET CURRENT BLOG ID
                await fspromise.writeFile(path.join(__dirname,`blogs/${sentData.id}.txt`), sentData.content, (err)=>{if(err){console.log(err); res.sendStatus(503)}});

                const newBlog = {id: sentData.id, title: sentData.title, description: sentData.description, content: `${sentData.id}.txt`, tags: sentData.tags};
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

// GET LATEST 4 BLOGS
router.get("/blogs/latest", (req,res)=>{
    const blogsLength = data.blogs.length;
    if(blogsLength > 4){
        const retval = [];
        for(let i = blogsLength - 4; i < blogsLength; ++i){
            retval.push(data.blogs[i]);
        }
        res.json(retval);
    }else{
        res.json(data.blogs);
    }
})

// GET BLOGS BY TAG
router.get("/blogs/category/:tag", (req,res)=>{
    req.params.tag
})

module.exports = router;