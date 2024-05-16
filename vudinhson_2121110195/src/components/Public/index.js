import Header from "./Header";
import Footer from "./Footer";

import Copyright from "./Copyright";
import Slider from "../../pages/frontend/Home/Slider";
import Home from "../../pages/frontend/Home/Home";
function PublicContent() {
    return (  
        <>
        <Header/>
        <Home />
        <Footer/>   
        <Copyright/>
    </>
    );
}

export default PublicContent;