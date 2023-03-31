import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogViewer from "./pages/BlogViewer";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

export default function App(){
    // TRIGGER NAV LINKS
    const [checkLinks, setCheckLinks] = React.useState(["close"]);

    return(
        <>
       <BrowserRouter>
        <Nav checkLinks={checkLinks} setCheckLinks={setCheckLinks} />
            <Routes>
                <Route index element={<Home setCheckLinks={setCheckLinks} />}/>
                <Route path="/blog" element={<Blog setCheckLinks={setCheckLinks} />}/>
                <Route path="/view" element={<BlogViewer setCheckLinks={setCheckLinks} />}/>
            </Routes>
       </BrowserRouter>
       <Footer />
       </>
    )
}