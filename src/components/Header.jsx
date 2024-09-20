import { useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const header = document.getElementById("site-header");
      if (window.scrollY > 0) {
        header.classList.add("site-header--on-scroll");
      } else {
        header.classList.remove("site-header--on-scroll");
      }
    });
  }, []);
  return (
    <header id="site-header" className="site-header">
      <Link to="/">
        <h1>Northcoders News</h1>
      </Link>
    </header>
  );
}

export default Header;
