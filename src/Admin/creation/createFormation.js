import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFormation } from "../../api/formations";

const CreateFormation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [image, setImage] = useState("");
  const [intitule, setIntitule] = useState("");
  const [description, setDescription] = useState("");

  const values = new FormData();
  values.append("image", image);
  values.append("intitule", intitule);
  values.append("description", description);

  const mutationAjoutFormation = useMutation({
    mutationFn: (formation) => createFormation(formation),
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("formations");
      console.log("Effectué....!");
    },
  });

  const enregFormation = (e) => {
    e.preventDefault();
    mutationAjoutFormation.mutate(values);
    navigate("/admin/formations");
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
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <input
            type="text"
            name="Intitule"
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
