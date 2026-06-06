import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-content">

        <h2
          style={{
            fontSize: "22px",
            fontWeight: "800",
            letterSpacing: "-0.5px",
            margin: 0,
            background: "linear-gradient(to right, #ffffff 60%, #0ea5e9 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block"
          }}
        >
          Aldonnn.dev
        </h2>

        <div className="nav-links">

          <NavLink to="/">
            Home
          </NavLink>

          <NavLink to="/experience">
            Experience
          </NavLink>

          <NavLink to="/project">
            Project
          </NavLink>

          <NavLink to="/about">
            About
          </NavLink>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;