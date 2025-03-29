import React from "react";
import { GoPencil, GoPerson, GoTrash, GoImage } from "react-icons/go";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { listUsers, supprimUser } from "../../api/users";
import { backend } from "../../Composants/backend";
import { MoonLoader } from "react-spinners";

const Users = () => {
  const queryClient = useQueryClient();

  const mutationSupprUser = useMutation({
    mutationFn: (idUser) => {
      return supprimUser(idUser);
    },
    onError: (err) => {
      console.error(err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("utilisateur");
    },
  });

  const supprimer = (idUser) => {
    mutationSupprUser.mutate(idUser);
    console.log(idUser)
  };

  const {
    isLoading,
    isError,
    data: util,
  } = useQuery({
    queryKey: ["utilisateur"],
    queryFn: listUsers,
  });

  if (isLoading) return(
    <div className="spinner">
      <MoonLoader size={120} color="#fff" />
    </div>
  );
  if (isError) return <div>Erreur de chargment</div>;

  return (
    <div className="outlet">
      <div className="categories_articles">
        <Link>
          <div className="categorie">
            <div className="icone_categ">
              <GoPerson />
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
              {util.length === 0 ? (
                <tr>
                  <td colSpan={7}> Aucun utilisateur trouvé !! </td>
                </tr>
              ) : (
                util.map((user, i) => {
                  return (
                    <tr key={i}>
                      <td className="photo-profil">
                        <img
                          src={`${backend}/profil-users/${user.imageUser}`}
                          alt=""
                        />
                      </td>
                      <td>{user.nomUser}</td>
                      <td>{user.postnomUser}</td>
                      <td>{user.prenomUser}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <Link to={`/admin/modif-users/${user.idUser}`}>
                          <GoPencil />
                        </Link>
                        <Link to={`/admin/photo-user/${user.idUser}`}>
                          <GoImage />
                        </Link>
                        <Link onClick={() => supprimer(user.idUser)}>
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

export default Users;
