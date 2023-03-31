import React from "react";
import Glide from "@glidejs/glide";
import {Link} from "react-router-dom";
import BlogResult from "../components/BlogResult";
import gsap from "gsap";
import Vivus from "vivus";

export default function Home(props){

    // Set Latest Blogs
const [blogs, setBlogs] = React.useState([]);
const blogComponents = blogs.map((blog, index)=>{
    const isEven = (index == 0 || index % 2 == 0);
    return(
        <BlogResult even={isEven} key={blog.id} {...blog} />
    )
})

// Onload Main Hero/Photo Animations
function mainPhotoAnims(evt){
    gsap.to(evt.currentTarget, {
        "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: "bounce.out"
    });
}

React.useEffect(()=>{
    // UPDATE NAV
    props.setCheckLinks(["close"]);

    new Glide('.glide', {
        type: "slider",
        bound: true,
        focusAt: 0,
        perView: 4,
        startAt: 0,
        breakpoints: {
            650: {
              perView: 2
            }
        }
    }).mount();

    getRecentBlogs();
    async function getRecentBlogs(){
        try{
            const blogData = await fetch(`${NODESERVER}/api/blogs/latest`, {headers: {'Cache-Control': 'no-cache'}});
            const recentBlogs = await blogData.json();
            setBlogs(recentBlogs);
       } catch(err){
            console.log(err)
        }
    }

    // Recent Posts Title ANimation
    jsdev.intersectionTrigger("#recentPostsTitle",{onTrigger:()=>{
        gsap.to("html", {
            "--recent-blog-title-width": "104%",
            "--recent-blog-title-left": "-2%",
            ease: "power4.out",
            duration: 3
        });
    },
    onExit: ()=>{
        gsap.to("html", {
            "--recent-blog-title-width": "0%",
            "--recent-blog-title-left": "50%",
            ease: "power4.out",
            duration: 3
        });
    }});

    // "I'm Carly" SVG Animation
    jsdev.intersectionTrigger("#imcarly", {thresholdOut: null, onTrigger: ()=>{
        gsap.to("#mainHeader h2", {
            x: 0,
            "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "power3.inOut",
            duration: 0.8
        })    
        new Vivus("imcarly", {type: "oneByOne", duration: 200, file: "./img/imcarly.svg"})
    }});

    // Mobile nav logo "home specific" listeners
    const mainNavLogo = document.getElementById("mainNavLogo");
    const mobileMainLogo = document.getElementById("mobileMainLogo");
    window.addEventListener("scroll", handleScroll);

    function handleScroll(){
        if(document.getElementById("pageID").dataset.id == "home" && window.matchMedia("only screen and (max-width: 650px)").matches){
            if(mobileMainLogo.getBoundingClientRect().top >= 0){
                mainNavLogo.style.display = "none";
            }else{
                mainNavLogo.style.display = "inline-flex";
            }
        }
    }

},[]);


    return(
        <>
        <div id="pageID" data-id="home"></div>
        
        <section id="mainLandingPage" className="center">
            <div id="mobileMainLogo" className="mobile">Mt Promiseland Farm</div>
            <img onLoad={mainPhotoAnims} src="./img/mainpic.png" alt="Picture of the Family" />
        </section>

        <section id="mainSectionOne">
            <div className="center">
                <div id="mainHeader">
                    <h2>Hi Guys</h2>
                    <div id="imcarly"></div>
                </div>
            </div>
            <div className="center">
                <p id="mainDescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </section>

        <section id="mainSectionTwo">

            <div className="glide">
            <div data-glide-el="track" className="glide__track">
                <ul className="glide__slides">
                <li className="glide__slide glide-slide-home"><Link to={`blog?tag=all`}><div>All Blogs</div></Link></li>
                <li className="glide__slide glide-slide-home"><Link to={`blog?tag=farm`}><div>Farm</div></Link></li>
                <li className="glide__slide glide-slide-home"><Link to={`blog?tag=projects`}><div>Projects</div></Link></li>
                <li className="glide__slide glide-slide-home"><Link to={`blog?tag=family`}><div>Family</div></Link></li>
                <li className="glide__slide glide-slide-home"><Link to={`blog?tag=recipes`}><div>Recipes</div></Link></li>
                </ul>
            </div>
            <div className="glide__arrows" data-glide-el="controls">
                <button className="glide__arrow glide__arrow--left glide-arrow-home" data-glide-dir="<">prev</button>
                <button className="glide__arrow glide__arrow--right glide-arrow-home" data-glide-dir=">">next</button>
            </div>
        </div>

        
        </section>
        <section id="mainSectionThree">
            <div className="center">
                <h1 id="recentPostsTitle">Recent Posts</h1>
            </div>
        <div id="recentPosts">
            {blogComponents}
        </div>
        </section>
        </>
    )
}