import React from "react";
import "../css/blogviewer.css";

export default function BlogViewer(props){
    React.useEffect(()=>{
        props.setCheckLinks(["close"]);
        window.scrollTo(0,0);

        setBlogContent();
        async function setBlogContent(){
            const GETVals = jsdev.GETValues();

            const fetchBlogData = await fetch(`${NODESERVER}/api/blogs/id/${GETVals.id}`);
            const blogData = await fetchBlogData.json();

            const fetchBlogContent = await fetch(`${NODESERVER}/api/blogcontent/${GETVals.id}`);
            const blogContent = await fetchBlogContent.text();

            // Create Date String
            const monthNames = ["January", "February", "March", "April", "May", "June",
                                "July", "August", "September", "October", "November", "December"
                                ];
            
            const currentDate = new Date(parseInt(blogData.id));

            document.getElementById("blogViewerDate").textContent = `- ${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
            document.getElementById("blogViewerTitle").textContent = blogData.title;
            document.getElementById("blogViewerContent").innerHTML = blogContent;
            document.getElementById("twitterShareLink").href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(blogData.description)}&url=${encodeURIComponent(window.location.href)}`;
            document.getElementById("linkedinShareLink").href = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blogData.title)}&source=www.mtpromiselandfarm.com&summary=${encodeURIComponent(blogData.description)}`;
        }
    },[])
    return(
        <>
            <div id="pageID" data-id="blogviewer"></div>
            
            <div id="blogViewerWrapper">      
                <div id="blogViewerContainer">
                    <div id="blogViewerShareContainer">
                        <a target={"_blank"} href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}%2F&amp;src=sdkpreparse`}>
                            <img src="/img/facebook-share-button.svg" alt="facebook logo" />
                        </a>
                        <a id="twitterShareLink" target={"_blank"} href={`#`}>
                            <img src="/img/twitter-share-button.svg" alt="twitter logo" />
                        </a>
                        <a id="linkedinShareLink" target={"_blank"} href={`#`}>
                            <img src="/img/linkedin-share-button.svg" alt="linkedin logo" />
                        </a>
                    </div>

                   
                    <div id="blogViewerTitle">...loading</div>
                    <div id="blogViewerDate">...loading</div>
                    <div id="blogViewerContent">...loading</div>
                </div>
            </div>
        </>
    )
}