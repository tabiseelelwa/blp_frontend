import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAbout } from "../../api/about";

const CreateAbout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [contenu, setContenu] = useState("");

  const mutationAjoutAbout = useMutation({
    mutationFn: (about) => {
      return createAbout(about);
    },
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("about");
    },
  });

  const values = new FormData();
  values.append("descr", contenu);

  const enregArticle = (e) => {
    e.preventDefault();
    mutationAjoutAbout.mutate(values);
    navigate("/admin/about_creat");
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
    <div className="element_admin redaction ">
      <form onSubmit={enregArticle}>
        
        <ReactQuill
          theme="snow"
          className="contenu about"
          modules={module}
          onChange={setContenu}
        />
        <button>Enregistrer</button>
      </form>
    </div>
  );
};

export default CreateAbout;
