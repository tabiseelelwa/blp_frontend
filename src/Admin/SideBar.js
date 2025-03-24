import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginDeconnexion } from "../api/login";

export default function SideBar() {
  const queryClient = useQueryClient();

  const mutationDeconnexion = useMutation({
    mutationFn: loginDeconnexion,
    onError: () => {
      console.log("Problème de déconnexion");
    },
    onSuccess: () => {
      queryClient.invalidateQueries("login");
    },
  });

  const deconnexion = () => {
    mutationDeconnexion.mutate();
    window.location.reload();
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
        <Link to="about">Apropos</Link>
        <button onClick={deconnexion}>Deconnexion </button>
      </div>
    </aside>
  );
}
