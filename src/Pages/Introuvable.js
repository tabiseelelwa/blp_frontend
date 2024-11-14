import React from "react";
import { Link } from "react-router-dom";

const Introuvable = () => {
  return <div className="introuvable">
    <div>404</div>
    <p>Page introuvable</p>
  <Link to="/">Retour à la page d'accueil</Link>
  </div>;
};

export default Introuvable;
