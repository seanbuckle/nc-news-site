import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <Link to="/">
        <h1>NC News</h1>
      </Link>
    </header>
  );
}

export default Header;
