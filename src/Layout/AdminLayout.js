/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../Admin/SideBar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { authentification } from "../api/login";

const AdminLayout = () => {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const [nom, setNom] = useState("");

  // Vérification de l'existence du token.
  // Si celle-ci n'existe pas, l'utilisateur est reconduit à la page de connexion
  const { data: user, isError } = useQuery({
    queryKey: ["login"],
    queryFn: authentification,
  });

  useEffect(() => {
    if (user) {
      if (user.Login === true) {
        setNom(user.nom);
        navigate("/admin");
      } else {
        navigate("/login");
      }
    }
  }, [user]);

  if (isError) return <div>Erreur de connexion</div>;

  return (
    <div className="admin">
      <SideBar className="sidebar" />
      <div className="gauche">
        <div className="navAdmin">{nom}</div>
        <div className="outlet_admin">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
