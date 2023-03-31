import React from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
export default function Nav(props){
    
    React.useEffect(()=>{
        
        if(document.getElementById("pageID")){

            document.querySelectorAll("#mainNavUL li a").forEach((elem)=>{
                if(elem.id == `${document.getElementById("pageID").dataset.id}Link`){
                    elem.classList.add("active")
                }else{
                    elem.classList.remove("active")
                }
            })

            if(window.matchMedia("only screen and (max-width: 650px)").matches){
                if(document.getElementById("pageID").dataset.id == "home" && mobileMainLogo.getBoundingClientRect().top >= 0 && props.checkLinks[0] == "close"){
                    mainNavLogo.style.display = "none";
                }else{
                    mainNavLogo.style.display = "inline-flex";
                }
            }
            const mainNav = document.getElementById("mainNav");
            if(document.getElementById("pageID").dataset.id !== "home"){
                mainNav.classList.add("secondary");
                mainNav.classList.remove("primary");
            }else{
                mainNav.classList.remove("secondary");
                mainNav.classList.add("primary");
            }
        }
    }, [props.checkLinks]);


    function openMenu(){
        props.setCheckLinks(["open"]);
    if(window.matchMedia("only screen and (max-width: 650px)").matches){

        const mainNavLogo = document.getElementById("mainNavLogo");
        mainNavLogo.style.display = "inline-flex";
        document.querySelector("body").style.overflowY = "hidden";
        const tl = gsap.timeline();
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

        gsap.to(mainNavLogo, {
            "--navlogo-underline-width": "100%",
            ease: "power3.in"
        })

        tl.to("#mainNavUL", {
            "clip-path": "circle(150% at 0% 0%)",
            duration:1,
            ease: "power3.out"
        }).to("#mainNav ul li",{
            x: 0,
            opacity: 1,
            stagger: 0.2,
            ease: "power4.out"
        }, "-=0.7")
    }
    }
    function closeMenu(){
        props.setCheckLinks(["close"]);
        if(window.matchMedia("only screen and (max-width: 650px)").matches){
        if(document.getElementById("pageID").dataset.id == "home" && mobileMainLogo.getBoundingClientRect().top >= 0){
            mainNavLogo.style.display = "none";
        }
        document.querySelector("body").style.overflowY = "auto";
        const tl = gsap.timeline();
        gsap.to("#mainNavHamburger",{
            rotate: "0",
            opacity:1,
            scale: 1,
            duration:1,
            ease: "power4.out"
        })

        gsap.to("#mainNavLogo", {
            "--navlogo-underline-width": "0%",
            ease: "power3.out"
        })

        gsap.to("#mainNavExit",{
            rotate: "360deg",
            scale: 0,
            opacity:0,
            duration:1,
            ease: "power4.out"
        });

        tl.to("#mainNavUL", {
            "clip-path": "circle(0% at 0% 0%)",
            duration:0.8,
            ease: "power3.out"
        })
        gsap.to("#mainNav ul li",{
            x: -20,
            opacity: 0,
            stagger: 0.2,
            ease: "power4.out"
        })
        gsap.to("#mainNav ul li:nth-of-type(even)",{
            x: -20,
            opacity: 0,
            stagger: 0.2,
            ease: "power4.out"
        })
        gsap.to("#mainNav ul li:nth-of-type(odd)",{
            x: 20,
            opacity: 0,
            stagger: 0.2,
            ease: "power4.out",
            delay: 0.2
        })
    }
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
            <Link onClick={closeMenu} to="/" id="mainNavLogo">Mt Promiseland Farm</Link>
        </nav>
    )
}