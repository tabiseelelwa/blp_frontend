
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const ModifAbout = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const backend = "http://localhost:8085";
  const enregArticle = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("description", description);

    axios
      .post(`${backend}/create-article`, formdata)
      .then((res) => {
        console.log(res.data);
        navigate("/about");
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
          onChange={setDescription}
        />
        <button>Modifier</button>
      </form>
    </div>
  );
};

export default ModifAbout;
