import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailsAdmin = () => {
  const backend = "https://backend.fizitech.org";
  const { idArticle } = useParams();
  const [values, setValues] = useState([]);

  useEffect(() => {
    axios
      .get(`${backend}/post/${idArticle}`)
      .then((res) => setValues(res.data[0]))
      .catch((err) => console.log(err));
  }, []);
  return <div>{values.titreArticle}</div>;
};

export default DetailsAdmin;
