import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { GoPencil, GoTrash, GoPerson, GoImage } from "react-icons/go";
import { Link } from "react-router-dom";
import { listFormations, supprimFormation } from "../../api/formations";
import { backend } from "../../Composants/backend";

const AdminListFormation = () => {
  const queryClient = useQueryClient();

  const mutationSupprForm = useMutation({
    mutationFn: (idFormation) => {
      return supprimFormation(idFormation);
    },
    onError: (err) => console.error(err),
    onSuccess: () => {
      queryClient.invalidateQueries("formations");
    },
  });

  const supprimer = (idFormation) => {
    mutationSupprForm.mutate(idFormation);
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
              <GoPerson />
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
                          src={`${backend}/images-formation/${use.imageFormation}`}
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
                        <Link to={`/admin/modif-formation/${use.idFormation}`}>
                          <GoPencil />
                        </Link>
                        <Link to={`/admin/photo-user/${use.idFormation}`}>
                          <GoImage />
                        </Link>
                        <Link onClick={() => supprimer(use.idFormation)}>
                          <GoTrash />
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
