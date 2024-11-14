import React from "react";
import { Link } from "react-router-dom";

const ModifMdp = () => {
  return (
    <div className="log">
      <form>
        <h3>Modifier le mot de passe</h3>

        <input type="text" placeholder="Entrez votre email" />
        <button>Valider</button>

        <Link to="/login">Se connecter</Link>
      </form>
    </div>
  );
};

export default ModifMdp;
