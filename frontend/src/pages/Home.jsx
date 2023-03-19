import React from "react";
import Nav from "../components/Nav";
import Glide from "@glidejs/glide";
import {Link} from "react-router-dom";
import BlogResult from "../components/BlogResult";
import gsap from "gsap";
import Vivus from "vivus";
export default function Home(){
    
    
    const [blogs, setBlogs] = React.useState([]);
    const blogComponents = blogs.map((blog)=>{
        return(
            <BlogResult key={blog.id} {...blog} />
        )
    })

    React.useEffect(()=>{
    new Glide('.glide', {
            type: "carousel",
            focusAt: "center",
            perView: 4
        }).mount();
    }, [])

    React.useEffect(()=>{

    getRecentBlogs();
    async function getRecentBlogs(){
        try{
       const blogData = await fetch(`${NODESERVER}/api/blogs`);
       const blogJSON = await blogData.json();
       let blogLength = blogJSON.length;
       let startPoint = 0;
       if(blogLength > 4){startPoint = blogLength - 4;}
       let recentBlogs = [];
        for(let i = startPoint; i < blogLength; ++i){
            if(i == 0 || i % 2 == 0){
                recentBlogs.push({...blogJSON[i], even: true});
            }else{
                recentBlogs.push(blogJSON[i]);
            }
        }
     setBlogs(recentBlogs);
       } catch(err){
            console.log(err)
        }
    }

    jsdev.intersectionTrigger("#recentPostsTitle",{onTrigger:()=>{
        gsap.to("html", {
            "--recent-blog-title-width": "104%",
            "--recent-blog-title-left": "-2%",
            ease: "power4.out",
            duration: 3
        });
    }
    , onExit: ()=>{
        gsap.to("html", {
            "--recent-blog-title-width": "0%",
            "--recent-blog-title-left": "50%",
            ease: "power4.out",
            duration: 3
        });
    }});

    jsdev.intersectionTrigger("#imcarly", {thresholdOut: null, onTrigger: ()=>{
        gsap.to("#mainHeader h2", {
            x: 0,
            "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ease: "power3.inOut",
            duration: 0.8,
            onComplete: ()=>{new Vivus("imcarly", {type: "oneByOne", file: "./img/imcarly.svg"})}
        })
        
    }})

    
    
},[]);


    return(
        <>
        <Nav />
        <div id="pageID" data-id="home"></div>
        
        <section id="mainLandingPage">
            <img src="./img/mainpic.png" alt="Picture of the Family" />
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
                <li className="glide__slide"><Link to={`blog?tag=farm`}><div>Farm</div></Link></li>
                <li className="glide__slide"><Link to={`blog?tag=projects`}><div>Projects</div></Link></li>
                <li className="glide__slide"><Link to={`blog?tag=recipes`}><div>Recipes</div></Link></li>
                </ul>
            </div>
            <div className="glide__arrows" data-glide-el="controls">
                <button className="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
                <button className="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
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