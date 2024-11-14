import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateFormation = () => {
  const navigate = useNavigate();
  const lien = "https://fizitech.org";
  const [image, setImage] = useState("");
  const [intitule, setIntitule] = useState("");
  const [description, setDescription] = useState("");

  const enregFormation = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("image", image);
    formdata.append("intitule", intitule);
    formdata.append("description", description);
    axios
      .post(`${lien}/enregFormation`, formdata)
      .then((res) => {
        console.log(res);
        navigate("/admin/formations");
      })
      .catch((err) => console.log(err));
  };

  const module = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", { color: [] }, { font: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { script: "sub" },
        { script: "super" },
      ],
      ["link"],
      [{ align: [] }, "blockquote", "code-block"],
    ],
  };

  return (
    <div className="">
      <div className="element_admin form ">
        <form onSubmit={enregFormation} style={{ width: "800px" }}>
          <h3>Création d'une formation</h3>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <input
            type="text"
            placeholder="Intitulé de la formation"
            onChange={(e) => setIntitule(e.target.value)}
          />
          <ReactQuill
            style={{ height: "140px", marginBottom: "2rem" }}
            theme="snow"
            className="contenu"
            modules={module}
            onChange={setDescription}
          />
          <button>Enregistrer</button>
        </form>
      </div>
    </div>
  );
};

export default CreateFormation;
