import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { GoMail, GoEye, GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";
import {
  lireMessage,
  listMessages,
  supprimMessage,
  totalMessages,
} from "../../api/message";

const Messages = () => {
  const queryClient = useQueryClient();

  const mutationSuppimer = useMutation({
    mutationFn: (idMessage) => {
      return supprimMessage(idMessage);
    },
    onError: (err) => {
      console.error(err);
      throw err;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("message");
    },
  });

  const mutationLireMessage = useMutation({
    mutationFn: (idMessage) => {
      return lireMessage(idMessage);
    },
    onError: (err) => console.log(err),
    onSuccess: () => {
      queryClient.invalidateQueries("listMessages");
    },
  });

  // NOMBRE TOTAL DE MESSAGES
  const {
    isLoading,
    isError,
    data: messages,
  } = useQuery({
    queryKey: ["totalMessage"],
    queryFn: totalMessages,
  });

  // CHARGEMENT DE TOUS LES MESSAGES
  const { data: contenu } = useQuery({
    queryKey: ["listMessages"],
    queryFn: listMessages,
  });

  const lireMsg = (idMessage) => {
    mutationLireMessage.mutate(idMessage);
  };

  const suppr = (idMessage) => {
    mutationSuppimer.mutate(idMessage);
  };

  if (isLoading) return <div>Chargement en cour</div>;
  if (isError) return <div>Erreur de chargement</div>;
  return (
    <div className="">
      <div className="categories_articles">
        <Link>
          <div className="categorie">
            <div className="icone_categ">
              <GoMail />
            </div>
            <div className="details_categ">
              <h6>{messages}</h6>
              <p>Messages</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="list_articles">
        <div className="en_tete">
          <h6>Messages</h6>
          <div className="cat">
            <button>Messages lus</button>
            <button>Messages non lus</button>
          </div>
        </div>
        <div className="corps">
          <table className="table table borderless">
            <thead>
              <tr>
                <th>Corps du message</th>
                <th>Status</th>
                <th>Expéditeur</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {contenu === undefined
                ? window.location.reload()
                : contenu.map((mess, i) => {
                    return (
                      <tr key={i}>
                        <td className="titre">
                          {mess.contenuMessage.length > 40
                            ? mess.contenuMessage.substring(0, 40) + " ..."
                            : mess.contenuMessage}
                        </td>
                        <td className="categ_article"> {mess.statut}</td>
                        <td className="auteur">
                          <small>{mess.nomExpediteur}</small>
                        </td>
                        <td className="actions_articles">
                          <GoEye
                            style={{ color: "gray" }}
                            onClick={() => lireMsg(mess.IdMessage)}
                          />

                          <GoTrash
                            style={{ color: "red" }}
                            onClick={() => suppr(mess.IdMessage)}
                          />
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>

          <div className="controls">
            <button>Précédent</button>
            <span>2</span>
            <button>Suivant</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
