import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const CreateAbout = () => {
  const navigate = useNavigate();
  const [contenu, setContenu] = useState("");
  const lien = "https://fizitech.org";
  const enregArticle = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("descr", contenu);
    axios
      .post(`${lien}/about-creat`, formdata)
      .then((res) => {
        console.log(res.data);
        console.log(contenu);
        navigate("/a-propos");
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
