import React from "react";
import "./pagination.css";

export default function Pagination(props){

    const [position, setPosition] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [pagesInView, setPagesInView] = React.useState([]);
    const [pages, setPages] = React.useState(0);
    const componentsInView = pagesInView.map((page)=>{
        const activeClass = (page.num - 1 == currentPage) ? "active" : "";
        return(
            <a onClick={handleItemClick} className={activeClass} key={page.num} to={page.link}><li>{page.num}</li></a>
        )
    });


    React.useEffect(()=>{
        setCurrentPage(0);
        setPosition(0)
    },[props.reload]);

    React.useEffect(()=>{

    setPages(Math.ceil(props.items.length / props.itemsPerPage));
    const pageCount = Math.ceil(props.items.length / props.itemsPerPage);

    const curPages = [];
        
        for(let i = position; ((i < pageCount) && (i < position + props.showAmt)); ++i){
            curPages.push({link: pageCount[i], num: i + 1, pos: currentPage});
        }
        if(pageCount < position + props.showAmt + 1){
            document.getElementById("paginationForwardArrow").classList.add("disabled");
        }else{
            document.getElementById("paginationForwardArrow").classList.remove("disabled");
        }
        if(position <= 0){
            document.getElementById("paginationBackArrow").classList.add("disabled");
        }else{
            document.getElementById("paginationBackArrow").classList.remove("disabled");
        }

        setPagesInView(curPages);
        const tempPagedItems = [];
        const curIndex = currentPage * props.itemsPerPage;
        for(let i = curIndex; (i < props.items.length && i < curIndex + props.itemsPerPage); ++i){
            tempPagedItems.push(props.items[i]);
        }
        props.setPagedItems(tempPagedItems);
    
    }, [props.reload, currentPage, position])


    function handleItemClick(evt){
        const item = evt.currentTarget;
        setCurrentPage(parseInt(item.textContent - 1))
    }
    function handleBackArrowClick(evt){
        const arrow = evt.currentTarget;
        if(!arrow.classList.contains("disabled")){
            if(currentPage == pagesInView[pagesInView.length - 1].num - 1){
                setCurrentPage((oldval)=>{return --oldval})
            }

            if(pagesInView[0].num - 1 > 0){
                setPosition((oldval)=>{return --oldval})
            }
        }
    }

    function handleForwardArrowClick(evt){
    const arrow = evt.currentTarget;
        if(!arrow.classList.contains("disabled")){
            if(currentPage == pagesInView[0].num - 1){
                setCurrentPage((oldval)=>{return ++oldval})
            }
            if(pagesInView[pagesInView.length - 1].num < pages){
                setPosition((oldval)=>{return ++oldval})
            }
           
        }
    }

    return(
        <ul id="paginationContainer">
            <li onClick={handleBackArrowClick} id="paginationBackArrow" className="disabled"></li>
            {componentsInView}
            <li onClick={handleForwardArrowClick} id="paginationForwardArrow"></li>
        </ul>
    )
}