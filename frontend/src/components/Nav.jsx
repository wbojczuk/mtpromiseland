import React from "react";
import { Link } from "react-router-dom";
export default function Nav(props){
    let navClass = (props.secondary) ? "secondary" : "primary";
    React.useEffect(()=>{
        if(document.getElementById("pageID")){
            document.getElementById(`${document.getElementById("pageID").dataset.id}Link`).classList.add("active");
        }
    })
    return(
        <nav id="mainNav" className={navClass}>
            <ul>
                <li>
                    <Link id="homeLink" to="/">Home</Link>
                </li>
                <li>
                    <Link id="blogLink" to="/blog">Blog</Link>
                </li>
            </ul>
            <div id="mainNavLogo">Mt Promiseland Farm</div>
        </nav>
    )
}