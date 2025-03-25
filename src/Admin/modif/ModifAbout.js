import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { detailsAbout, modifAbout } from "../../api/about";
const ModifAbout = () => {
  const navigate = useNavigate();
  const { idAbout } = useParams();
  const queryClient = useQueryClient();

  const [contenu, setContenu] = useState("");

  const values = new FormData();
  values.append("contenu", contenu);

  const mutationModifAbout = useMutation({
    mutationFn: () => modifAbout(idAbout, values),
    onSuccess: () => {
      queryClient.invalidateQueries("about");
    },
    
  });

  const {
    isLoading,
    isError,
    data: about,
  } = useQuery({
    queryKey: ["about", idAbout],
    queryFn: () => detailsAbout(idAbout),
  });

  useEffect(() => {
    if (about) {
      setContenu(about.description);
    }
  }, [about]);

  const enregArticle = (e) => {
    e.preventDefault();
    mutationModifAbout.mutate(values);
    navigate("/admin/about");
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

  if (isLoading) return <div>Chargement en cours</div>;
  if (isError) return <div>Erreur de chargement</div>;

  return (
    <div className="element_admin redaction ">
      <form onSubmit={enregArticle}>
        <ReactQuill
          theme="snow"
          className="contenu about"
          modules={module}
          onChange={setContenu}
          value={contenu}
        />
        <button>Modifier</button>
      </form>
    </div>
  );
};

export default ModifAbout;
