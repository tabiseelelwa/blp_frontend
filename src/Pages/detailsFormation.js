/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { detailsFormation } from "../api/formations";
import { backend } from "../Composants/backend";
import { MoonLoader } from "react-spinners";

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

  if (isLoading)
    return (
      <div className="spinner">
        <MoonLoader size={120} color="#fff" />
      </div>
    );
  if (isError) return <div>`Erreur : ${error.cause}`</div>;

  return (
    <div className="Details">
      <div className="contenu">
        <img
          src={`${backend}/images-formation/${donne.imageFormation}`}
          alt=""
        />
        <h3>{donne.intituleFormation}</h3>
        <div dangerouslySetInnerHTML={{ __html: donne.descriptFormation }} />
      </div>
    </div>
  );
};

export default DetailsFormation;
