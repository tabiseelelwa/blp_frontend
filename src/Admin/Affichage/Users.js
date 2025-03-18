import React, { useEffect, useState } from "react";
import { FaEdit, FaUser, FaTrash, FaCamera } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const Users = () => {
  const backend = "http://localhost:8085";

  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get(`${backend}/listUsers`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  const supprimer = (idUser) => {
    axios
      .delete(`${backend}/supprUser/` + idUser)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // FILTRES
  const categFilstre = [...new Set(user.map((val) => val.role))];

  const filtres = (cat) => {
    const newItems = user.filter((newVal) => newVal.role === cat);
    setUser(newItems);
  };

  function ButtonsFiltres() {
    return (
      <div className="cat">
        {categFilstre.map((val, i) => (
          <button onClick={() => filtres(val)} key={i}>
            {" "}
            {val}{" "}
          </button>
        ))}
        <button onClick={() => window.location.reload()}>
          Tous les utilisateurs
        </button>
      </div>
    );
  }
  // PAGINATION

  const [currentPage, setCurrentpage] = useState(1);

  const enregParPage = 5;
  const lastIndex = currentPage * enregParPage;
  const firstIndex = lastIndex - enregParPage;
  const donnees = user.slice(firstIndex, lastIndex);
  const nbrPage = Math.ceil(user.length / enregParPage);

  return (
    <div className="outlet">
      <div className="categories_articles">
        <Link>
          <div className="categorie">
            <div className="icone_categ">
              <FaUser />
            </div>
            <div className="details_categ">
              <p>Utilisateurs</p>
              <h6>300</h6>
            </div>
          </div>
        </Link>
      </div>
      <div className="list_articles">
        <div className="en_tete">
          <h6>Liste des utilisateurs</h6>
          <ButtonsFiltres />
          <Link to="/admin/create-user" className="ajoutAgent">
            Ajouter
          </Link>
        </div>
        <div className="corps">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Postnom</th>
                <th>Prenom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {donnees.length === 0 ? (
                <tr>
                  <td colSpan={7}> Aucun utilisateur trouvé !! </td>
                </tr>
              ) : (
                donnees.map((use, i) => {
                  return (
                    <tr key={i}>
                      <td className="photo-profil">
                        <img
                          src={`${backend}/profil-users/${use.imageUser}`}
                          alt=""
                        />
                      </td>
                      <td>{use.nomUser}</td>
                      <td>{use.postnomUser}</td>
                      <td>{use.prenomUser}</td>
                      <td>{use.email}</td>
                      <td>{use.role}</td>
                      <td>
                        <Link to={`/admin/modif-users/${use.idUser}`}>
                          <FaEdit />
                        </Link>
                        <Link to={`/admin/photo-user/${use.idUser}`}>
                          <FaCamera />
                        </Link>
                        <Link onClick={() => supprimer(use.idUser)}>
                          <FaTrash />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <div className="controls">
            <button onClick={precedent}>
              {nbrPage <= 1
                ? ""
                : currentPage > 1 && nbrPage > 1
                ? "Précédent"
                : ""}
            </button>
            <span>{nbrPage <= 1 ? "" : currentPage + " sur " + nbrPage}</span>
            <button onClick={suivant}>
              {currentPage >= nbrPage ? "" : "Suivant"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  function precedent() {
    if (currentPage !== 1) {
      setCurrentpage(currentPage - 1);
    }
  }

  function suivant() {
    if (currentPage !== nbrPage) {
      setCurrentpage(currentPage + 1);
    }
  }
};

export default Users;
