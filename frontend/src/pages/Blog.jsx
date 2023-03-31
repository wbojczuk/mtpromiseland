import React from "react";
import LoadingAnim from "../components/LoadingAnim";
import Pagination from "../components/pagination/Pagination";
import BlogResult from "../components/BlogResult";
import BlogResultNav from "../components/BlogResultNav";
import "../css/blogresults.css";


export default function Blog(props){

    const [currentBlogs, setCurrentBlogs] = React.useState(null);
    
    const [blogResults, setBlogResults] = React.useState([]);
    const blogResultComponents = blogResults.map((blogResult)=>{
        return(
            <BlogResult key={blogResult.id} resultPage={true} {...blogResult} />
        )
    });

    const [pagedItems, setPagedItems] = React.useState("");

    const [reloadTrigger, setReloadTrigger] = React.useState(null);

    function triggerReload(){
        setReloadTrigger(jsdev.getUUID());
    }

    const [currentTag, setCurrentTag] = React.useState("all");

    const [blogCategories, setBlogCategories] = React.useState([]);


    React.useEffect(()=>{
        // SET ACTIVE BLOG NAV
        const blogCategoryElems = document.querySelectorAll(".glide-slide-blog .item");
        
        blogCategoryElems.forEach((elem)=>{
            if(elem.textContent.toLowerCase() == currentTag){
                elem.classList.add("active");
            }else{
                elem.classList.remove("active");
            }
        });
        // SET CURRENT BLOG STATE
        document.getElementById("blogSearchTitle").textContent = (currentTag.toLowerCase() == "all") ? "All Blogs" : `Search: ${jsdev.wordsToUpperCase(currentTag)}`;
    },[currentTag])


    React.useEffect(()=>{
        // Update Main Website Nav
        props.setCheckLinks(["close"]);
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
            // If blogs have not been fetched yet
                if(currentBlogs == null){
                    try{
                        const blogData = await fetch(`${NODESERVER}/api/blogs`, {headers: {'Cache-Control': 'no-cache'}});
                        const blogJSON = await blogData.json();
                        
                        setBlogCategories(getBlogCategories(blogJSON));

                        if(tag !== "all"){
                            setBlogResults(getBlogsOfCategory(blogJSON, tag));
                        }else{
                            if(document.getElementById("loadingAnim")){document.getElementById("loadingAnim").style.display = "none"}
                            setBlogResults(blogJSON);
                        }
                        if(document.getElementById("loadingAnim")){document.getElementById("loadingAnim").style.display = "none"}
                        setCurrentBlogs(blogJSON);
        
                    }catch(err){
                        console.log(err);
                    }
                }else{
                    // If Blogs have been fetched
                    if(tag !== "all"){
                        setBlogResults(getBlogsOfCategory(currentBlogs, tag));
                    }else{
                        if(document.getElementById("loadingAnim")){document.getElementById("loadingAnim").style.display = "none"}
                        setBlogResults(currentBlogs);
                    }
                }
            
        }

        // GET categories from url
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

        <div id="pageID" data-id="blog"></div>
        <LoadingAnim />
        <div>
            <div id="blogSearchTitle">All Blogs</div>
            <BlogResultNav currentTag={currentTag} blogCategories={blogCategories} triggerReload={triggerReload}/>
            <div id="blogResultSection">
                {pagedItems}
            </div>
            <div className="center-full" style={{display: "inline-block", margin: "2% 0 1% 0"}}>
                <Pagination reload={blogResults} items={blogResultComponents} setPagedItems={setPagedItems} showAmt={4} itemsPerPage={4}/>
            </div>
            
            
        </div>
        </>
    )
}