import React from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
export default function Nav(props){
    React.useEffect(()=>{
        if(document.getElementById("pageID")){
            document.getElementById(`${document.getElementById("pageID").dataset.id}Link`).classList.add("active");
            const navClass = (document.getElementById("pageID").dataset.id !== "home") ? "secondary" : "primary";
            document.getElementById("mainNav").classList.add(navClass);
        }
        
    });
    function openMenu(evt){
        document.querySelector("body").style.overflowY = "hidden";
        gsap.to("#mainNavHamburger",{
            rotate: "-360deg",
            opacity:0,
            scale: 0,
            duration:1,
            ease: "power4.out"
        })

        gsap.fromTo("#mainNavExit",{
            rotate: "360deg",
            scale: 0,
            opacity:0,
        },
        {
            rotate: "0",
            scale: 1,
            opacity:1,
            duration:1,
            ease: "power4.out"
        });

        gsap.to("#mainNavUL", {
            "clip-path": "circle(150% at 0% 0%)",
            duration:1,
            ease: "power4.out"
        })
    }
    function closeMenu(evt){
        document.querySelector("body").style.overflowY = "auto";
        gsap.to("#mainNavHamburger",{
            rotate: "0",
            opacity:1,
            scale: 1,
            duration:1,
            ease: "power4.out"
        })

        gsap.to("#mainNavExit",{
            rotate: "360deg",
            scale: 0,
            opacity:0,
            duration:1,
            ease: "power4.out"
        });

        gsap.to("#mainNavUL", {
            "clip-path": "circle(0% at 0% 0%)",
            duration:1,
            ease: "power4.out"
        })
    }
    return(
        <nav id="mainNav">
            <div onClick={openMenu} id="mainNavHamburger"></div>
            <div onClick={closeMenu} id="mainNavExit"></div>
            <ul id="mainNavUL">
                <li>
                    <Link onClick={closeMenu} id="homeLink" to="/">Home</Link>
                </li>
                <li>
                    <Link onClick={closeMenu} id="blogLink" to="/blog">Blog</Link>
                </li>
            </ul>
            <Link to="/" id="mainNavLogo">Mt Promiseland Farm</Link>
        </nav>
    )
}