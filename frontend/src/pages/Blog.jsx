import React from "react";
import LoadingAnim from "../components/LoadingAnim";
import Nav from "../components/Nav";
import {Link} from "react-router-dom";
import BlogResult from "../components/BlogResult";
import "../css/blogresults.css";
export default function Blog(){

    const [currentBlogs, setCurrentBlogs] = React.useState(null);
    
 const [blogResults, setBlogResults] = React.useState([]);
        const blogResultComponents = blogResults.map((blogResult)=>{
            return(
                <BlogResult key={blogResult.id} resultPage={true} {...blogResult} />
            )
        });

        const [reloadTrigger, setReloadTrigger] = React.useState(null);

        function triggerReload(){
            setReloadTrigger(jsdev.getUUID());
        }

        const [currentTag, setCurrentTag] = React.useState("all");

        const [blogCategories, setBlogCategories] = React.useState(["test"]);
        const blogCategoryComponents = blogCategories.map((blogCategory)=>{
            return(
                <Link onClick={triggerReload} key={blogCategory} className="item" to={`/blog?tag=${blogCategory}`}>{jsdev.wordsToUpperCase(blogCategory)}</Link>
            )
        });

React.useEffect(()=>{
    // SET ACTIVE BLOG NAV
    const blogCategoryElems = document.querySelectorAll("#blogResultNav .item");
    blogCategoryElems.forEach((elem)=>{
        if(elem.textContent.toLowerCase() == currentTag){
            elem.classList.add("active");
        }else{
            elem.classList.remove("active");
        }
    });
},[blogCategories, currentTag])


React.useEffect(()=>{
        window.scrollTo(0, 0);

        function getBlogCategories(blogs){
            const categories = ["all"];
            blogs.forEach((blog)=>{
                blog.tags.forEach((tag)=>{
                    if(!categories.includes(tag)){
                        categories.push(tag);
                    }
                })
            });
            return categories;
        }
    
        function getBlogsOfCategory(blogs, category){
            const retBlogs = [];
            blogs.forEach((blog)=>{
                if(blog.tags.findIndex((x)=>{return (x.toLowerCase() === category.toLowerCase())}) != -1){
                    retBlogs.push(blog);
                }
            });
            return retBlogs;
        }
    
        async function getBlogResults(tag = "all"){
                if(currentBlogs == null){
                    try{
                        const blogData = await fetch(`${NODESERVER}/api/blogs`, {headers: {'Cache-Control': 'no-cache'}});
                        const blogJSON = await blogData.json();
        
                        setBlogCategories(getBlogCategories(blogJSON));
                        if(tag !== "all"){
                            // ADD TAG ALL SUPPORT
                            setBlogResults(getBlogsOfCategory(blogJSON, tag));
                        }else{
                            if(document.getElementById("loadingAnim")){document.getElementById("loadingAnim").style.display = "none"}
                        setBlogResults(blogJSON);
                        }
                        if(document.getElementById("loadingAnim")){document.getElementById("loadingAnim").style.display = "none"}
                        setCurrentBlogs(blogJSON);
        
                    } catch(err){
                        console.log(err);
                    }
                }else{
                    if(tag !== "all"){
                        // ADD TAG ALL SUPPORT
                        setBlogResults(getBlogsOfCategory(currentBlogs, tag));
                    }else{
                        if(document.getElementById("loadingAnim")){document.getElementById("loadingAnim").style.display = "none"}
                    setBlogResults(currentBlogs);
                    }
                }
               
        }

        const urlData = jsdev.GETValues()
            if(urlData.tag){
                getBlogResults(urlData.tag);
                setCurrentTag(urlData.tag);
            }else{
                getBlogResults("all");
            }
            
    },[reloadTrigger])

    
    return(
        <>
        <Nav />

        <div id="pageID" data-id="blog"></div>
        <LoadingAnim />
        <div>
            <div id="blogSearchTitle">Blog Search</div>
            <div id="blogResultNav">
                {blogCategoryComponents}
            </div>
            <div id="blogResultSection">
                {blogResultComponents}
            </div>
        </div>
        </>
    )
}