import axios from "axios";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();
  const backend = "https://backend.fizitech.org";

  const deconnexion = (e) => {
    e.preventDefault();
    axios.get(`${backend}/logout`).then((res) => {
      navigate("/login");
    });
  };

  return (
    <aside>
      <div className="head-sidebar">
        FiziTech Academy
        <div className="closeSideBar">
          <AiOutlineClose />
        </div>
      </div>
      <div className="body-sidebar">
        <Link to="">Accueil</Link>
        <Link to="messages" className="message">
          Messages
          <span> 105 </span>
        </Link>
        <Link to="formations">Formations</Link>
        <Link to="list-users">Utilisateurs</Link>
        <Link to="config">Paramètres</Link>
        <button onClick={deconnexion}>Deconnexion </button>
      </div>
    </aside>
  );
}
