import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaCamera, FaEdit, FaTrash, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { listFormations } from "../../api/formations";

const AdminListFormation = () => {
  const backend = "http://localhost:8085";

  const supprimer = (idFormation) => {
    axios
      .delete(`${backend}/supprUser/` + idFormation)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const {
    data: formations,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["formations"],
    queryFn: listFormations,
  });

  if (isLoading) return <div>Chargement en cours</div>;
  if (isError) return <div>Erreur de chargement de données.....</div>;

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
              {formations.length === 0 ? (
                <tr>
                  <td colSpan={7}> Aucune formation trouvée !! </td>
                </tr>
              ) : (
                formations.map((use, i) => {
                  return (
                    <tr key={i}>
                      <td className="photo-profil">
                        <img
                          src={`${backend}/images-formations/${use.imageFormation}`}
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
        </div>
      </div>
    </div>
  );
};

export default AdminListFormation;
