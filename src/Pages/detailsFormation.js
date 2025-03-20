/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { detailsFormation } from "../api/formations";
import { backend } from "../Composants/backend";

const DetailsFormation = () => {
  const { idFormation } = useParams();

  const {
    isLoading,
    isError,
    error,
    data: donne,
  } = useQuery({
    queryKey: ["formations", idFormation],
    queryFn: async () => {
      const data = await detailsFormation(idFormation);
      return data;
    },
  });

  if (isLoading) return <div>Chargement</div>;
  if (isError) return <div>`Erreur : ${error.cause}`</div>;

  return (
    <div className="Details">
      <div className="contenu">
        <img
          src={`${backend}/images-formations/${donne.imageFormation}`}
          alt=""
        />
        <h3>{donne.intituleFormation}</h3>
        <div dangerouslySetInnerHTML={{ __html: donne.descriptFormation }} />
      </div>
    </div>
  );
};

export default DetailsFormation;
