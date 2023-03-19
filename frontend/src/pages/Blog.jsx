import React from "react";
import Nav from "../components/Nav";
import {Link} from "react-router-dom";
import BlogResult from "../components/BlogResult";
import "../css/blogresults.css";
export default function Blog(){
    
 const [blogResults, setBlogResults] = React.useState([]);
        const blogResultComponents = blogResults.map((blogResult)=>{
            return(
                <BlogResult key={blogResult.id} resultPage={true} {...blogResult} />
            )
        });

        const [reloadTrigger, setReloadTrigger] = React.useState(null);

        const [blogCategories, setBlogCategories] = React.useState(["test"]);
        const blogCategoryComponents = blogCategories.map((blogCategory)=>{
            return(
                <Link onClick={triggerReload} key={blogCategory} className="item" to={`/blog?tag=${blogCategory}`}>{jsdev.wordsToUpperCase(blogCategory)}</Link>
            )
        });

        function triggerReload(){
            setReloadTrigger(jsdev.getUUID());
        }

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
    
        async function getBlogResults(tag = null){
                try{
                    const blogData = await fetch(`${NODESERVER}/api/blogs`);
                    const blogJSON = await blogData.json();
    
                    setBlogCategories(getBlogCategories(blogJSON))
                    if(tag !== null && tag !== "all"){
                        // ADD TAG ALL SUPPORT
                        setBlogResults(getBlogsOfCategory(blogJSON, tag));
                    }else{
                    setBlogResults(blogJSON);
                    }
    
                } catch(err){
                    console.log(err);
                }
        }

        const urlData = jsdev.GETValues()
            if(urlData.tag !== null){
                getBlogResults(urlData.tag);
            }else{
                getBlogResults();
            }
            
    },[reloadTrigger])

    
    return(
        <>
        <Nav />

        <div id="pageID" data-id="blog"></div>

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