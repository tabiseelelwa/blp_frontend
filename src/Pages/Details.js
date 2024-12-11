import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Details = () => {
  const backend = "http://localhost:8085";
  const { idArticle } = useParams();
  const [values, setValues] = useState([]);

  useEffect(() => {
    axios
      .get(`${backend}/post/${idArticle}`)
      .then((res) => {
        setValues(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="Details">
      <div className="contenu">
        <img src={`${backend}/images-article/${values.imageArticle}`} alt="" />
        <h3>{values.titreArticle}</h3>
        <div dangerouslySetInnerHTML={{ __html: values.contenu }} />
      </div>
      <div className="user">
        <img src="../Img/LOGO2FZT.png" alt="" />
        <div className="info">
          <span>
            Rédigé par <strong>{values.User}</strong>, le {values.dateCreation}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Details;
