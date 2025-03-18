/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
// import { backend } from "./backend";
// import axios from "axios";

const Navbar = () => {
  // const [affichNav, setAffichNav] = useState(false);

  const [navActif, setNavActif] = useState(
    window.innerWidth >= 800 ? true : false
  );

  const closeNav = () => {
    if (navActif === true) {
      if (window.innerWidth <= 800) {
        setNavActif(false);
      } else {
        setNavActif(true);
      }
    }
  };

  // useEffect(() => {
  //   axios
  //     .get(`${backend}/authentification`)
  //     .then((res) => {
  //       if (res.data.valid) {
  //         setAffichNav(true);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

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
            {/* {affichNav ? (
              <NavLink
                onClick={closeNav}
                className="el-menu"
                to="/article-creation"
              >
                Nouvel article
              </NavLink>
            ) : null} */}
            <NavLink onClick={closeNav} className="el-menu" to="/formations">
              Nos formations
            </NavLink>
            <NavLink onClick={closeNav} className="el-menu" to="/a-propos">
              FiziTech Academy
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
