import React from "react";
import { Link } from "react-router-dom"

function Index() {
  //document.documentElement.classList.remove("nav-open");
  // React.useEffect(() => {
  //   document.body.classList.add("index");
  //   return function cleanup() {
  //     document.body.classList.remove("index");
  //   };
  // });
    return (
      <>
        <Link to="/post">
            Test
        </Link>
      </>
    );
  }
  
  export default Index;