import React from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
export default function BlogResult(props){
    function handleMouseEnter(evt){
            gsap.to(evt.currentTarget.querySelector(".blog-result-hover"),{
                width: "100%",
                ease: "power2.inOut"})
    }
    function handleMouseLeave(evt){
            gsap.to(evt.currentTarget.querySelector(".blog-result-hover"),{
                width: "0",
                ease: "power2.inOut"})
}
if(props.even){
    return(
        <Link to={`/view?id=${props.id}`} className="blog-result even" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="content">
                <div className="title">{(props.title) ? props.title : "Temp Title"}</div>
                <div className="description">{(props.description) ? props.description : ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}</div>
            </div>
            <img src={(props.img) ? props.img : "./img/placeholder.jpg"} alt="Post Image" />
            <div className="blog-result-hover"></div>
        </Link>
    )
}else{
    return(
        <Link to={`/view?id=${props.id}`} className={(props.resultPage) ? "blog-result-page" : "blog-result"}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <img src={(props.img) ? props.img : "./img/placeholder.jpg"} alt="Post Image" />
        <div className="content">
            <div className="title">{(props.title) ? props.title : "Temp Title"}</div>
            <div className="description">{(props.description) ? props.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}</div>
            <div className="blog-result-hover"></div>
        </div>
    </Link>
    )
}

}