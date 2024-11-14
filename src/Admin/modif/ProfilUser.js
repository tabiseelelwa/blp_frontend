import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProfilUser = () => {
  const lien = "https://fizitech.org";

  const navigate = useNavigate();
  const { idUser } = useParams();
  const [fichier, setFichier] = useState();
  const [user, setUser] = useState({
    nomUser: "",
    prenomUser: "",
  });

  useEffect(() => {
    axios.get(`${lien}/user/${idUser}`).then((res) => setUser(res.data[0]));
  }, []);

  const photoUser = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("photo", fichier);
    axios
      .put(`${lien}/photo-user/${idUser}`, formdata)
      .then((res) => {
        console.log(res);
        navigate("/admin/list-users");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <p>{user.nomUser} </p>
      <form onSubmit={photoUser}>
        <img
          style={{ height: "500px", width: "75%", marginBottom: "1rem" }}
          src={`${lien}/profil/${user.imageUser}`}
          alt=""
        />
        <input type="file" onChange={(e) => setFichier(e.target.files[0])} />
        <button>Valider</button>
      </form>
    </div>
  );
};

export default ProfilUser;
