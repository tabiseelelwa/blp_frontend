/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../Admin/SideBar";
import axios from "axios";
import { backend } from "../Composants/backend";

// AFFICHAGE DE L'ADMINISTRATEUR

const AdminLayout = () => {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const [nom, setNom] = useState("");

  // Vérification de l'existence de la session.
  // Si celle-ci n'existe pas, l'utilisateur est reconduit à la page de connexion

  useEffect(() => {
    axios
      .get(`${backend}/api/authentification`)
      .then((res) => {
        if (res.data.valid) {
          setNom(res.data.nomUser);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

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
