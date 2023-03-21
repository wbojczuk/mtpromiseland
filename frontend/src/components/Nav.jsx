import React from "react";
import { Link } from "react-router-dom";
export default function Nav(props){
    React.useEffect(()=>{
        if(document.getElementById("pageID")){
            document.getElementById(`${document.getElementById("pageID").dataset.id}Link`).classList.add("active");
            const navClass = (document.getElementById("pageID").dataset.id !== "home") ? "secondary" : "primary";
            document.getElementById("mainNav").classList.add(navClass);
        }
        
    })
    return(
        <nav id="mainNav">
            <ul>
                <li>
                    <Link id="homeLink" to="/">Home</Link>
                </li>
                <li>
                    <Link id="blogLink" to="/blog">Blog</Link>
                </li>
            </ul>
            <Link to="/" id="mainNavLogo">Mt Promiseland Farm</Link>
        </nav>
    )
}