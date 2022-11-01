//import module
import React from "react";




//Simple component that creates a footer
//Current year is used with Date object
function Footer(){

    let d = new Date();
    return(
        <footer>
            <p>Copyright © {d.getFullYear()}</p>
        </footer>
    );
}


//export component
export default Footer;