import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCamera, FaEdit, FaTrash, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminListFormation = () => {
  const [user, setUser] = useState([]);

  const lien = "https://fizitech.org";

  useEffect(() => {
    axios
      .get(`${lien}/formations`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);

  const supprimer = (idFormation) => {
    axios
      .delete(`${lien}/supprUser/` + idFormation)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

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
              <h6>300</h6>
              <p>Formations</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="list_articles">
        <div className="en_tete">
          <h6>Nos formations</h6>
          <Link to="/admin/create-formation" className="ajoutAgent">
            Ajouter
          </Link>
        </div>
        <div className="corps">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Intitulé de la formation</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {donnees.length === 0 ? (
                <tr>
                  <td colSpan={7}> Aucune formation trouvée !! </td>
                </tr>
              ) : (
                donnees.map((use, i) => {
                  return (
                    <tr key={i}>
                      <td className="photo-profil">
                        <img
                          src={`${lien}/images-formations/${use.imageFormation}`}
                          alt=""
                        />
                      </td>
                      <td>
                        {" "}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: use.intituleFormation,
                          }}
                        />
                      </td>
                      <td>
                        <Link to={`/admin/modif-users/${use.idFormation}`}>
                          <FaEdit />
                        </Link>
                        <Link to={`/admin/photo-user/${use.idFormation}`}>
                          <FaCamera />
                        </Link>
                        <Link onClick={() => supprimer(use.idFormation)}>
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

export default AdminListFormation;
