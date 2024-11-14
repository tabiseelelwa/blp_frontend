import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
  const [navActif, setNavActif] = useState(
    window.innerWidth >= 800 ? true : false
  );

  const closeNav = () => {
    if (window.innerWidth <= 800) {
      setNavActif(false);
    } else {
      setNavActif(true);
    }
  };
  return (
    <nav>
      <div className="navbar">
        <div className="logo">
          <NavLink to="/">
            <h4>FiziTech Academy</h4>
          </NavLink>
        </div>
        {navActif ? (
          <div className="menu">
            <NavLink onClick={closeNav} className="el-menu" to="/formations">
              Nos formations
            </NavLink>
            <NavLink onClick={closeNav} className="el-menu" to="/a-propos">
              FiziTech Academy
            </NavLink>
            <NavLink
              onClick={closeNav}
              className="el-menu bouton__con"
              to="/admin"
            >
              Connexion
            </NavLink>
          </div>
        ) : null}
        <div className="nav__buttons" onClick={() => setNavActif(!navActif)}>
          {navActif ? <AiOutlineClose /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
