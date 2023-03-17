import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Footer from "./components/Footer";
export default function App(){
    return(
        <>
       <BrowserRouter>
        <Routes>
            <Route index element={<Home />}/>
            <Route path="/blog" element={<Blog />}/>
        </Routes>
       </BrowserRouter>
       <Footer />
       </>
    )
}