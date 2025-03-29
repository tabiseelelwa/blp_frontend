import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loginDeconnexion } from "../api/login";
import { nonReadMessages } from "../api/message";
import { MoonLoader } from "react-spinners";

export default function SideBar() {
  const queryClient = useQueryClient();

  // AFFICHAGE DU NOMBRE DE MESSAGES
  const {
    data: messages,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["message"],
    queryFn: nonReadMessages,
  });

  // PROCEDURE DE DECONNEXION
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

  if (isError) return <div>Erreur de chargement</div>;
  if (isLoading)
    return (
      <div className="spinner">
        <MoonLoader size={120} color="#fff" />
      </div>
    );
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
          {messages <= 0 ? "" : <span> {messages} </span>}
        </Link>
        <Link to="formations">Formations</Link>
        <Link to="list-users">Utilisateurs</Link>
        <Link to="about">Apropos</Link>
        <button onClick={deconnexion}>Deconnexion </button>
      </div>
    </aside>
  );
}
