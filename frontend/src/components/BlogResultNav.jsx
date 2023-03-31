import React from "react";
import { Link } from "react-router-dom";
import Glide from "@glidejs/glide";

// Carousel Component
function NavItemComponent(props){
    React.useEffect(()=>{
        new Glide('.glide', {
            type: "slider",
            bound: true,
            focusAt: 0,
            perView: 4,
            startAt: 0,
            breakpoints: {
                650: {
                  perView: 3
                }
            }
        }).mount();
    
    });
    
    // Set initial active link based on props
    const activeClass = (props.blogCategory == props.currentTag) ? "active" : "";
        return(
            <li className="glide__slide glide-slide-blog"><Link onClick={props.triggerReload}  className={`item ${activeClass}`} to={`/blog?tag=${props.blogCategory}`}>{jsdev.wordsToUpperCase(props.blogCategory)}</Link></li>
        )
    }

// Nav Component
export default function BlogResultNav(props){
    const [navItemComponents, setNavItemComponents] = React.useState([])

    // Create carousel when updated
    React.useEffect(()=>{
        const navItemComponentsTemp = props.blogCategories.map((blogCategory)=>{
            return(
                <NavItemComponent currentTag={props.currentTag} triggerReload={props.triggerReload} blogCategory={blogCategory} key={blogCategory}/>
            )
        })
        setNavItemComponents(navItemComponentsTemp)
        
    }, [props.blogCategories])

    // Completed Component to return
    return(
        <div id="blogResultNav">
            <div className="glide glide-blog">
            <div data-glide-el="track" className="glide__track">
                <ul className="glide__slides">
               {navItemComponents}
                </ul>
            </div>
            <div className="glide__arrows" data-glide-el="controls">
                <button className="glide__arrow glide__arrow-blog glide__arrow--left-blog glide__arrow--left" data-glide-dir="<">&lt;</button>
                <button className="glide__arrow glide__arrow-blog glide__arrow--right-blog glide__arrow--right" data-glide-dir=">">&gt;</button>
            </div>
        </div>
        </div>
    )
}