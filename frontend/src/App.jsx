import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
export default function App(){
    return(
        <>
        
       <BrowserRouter>
       <Nav />
        <Routes>
            <Route index element={<Home />}/>
            <Route path="/blog" element={<Blog />}/>
        </Routes>
       </BrowserRouter>
       <Footer />
       </>
    )
}