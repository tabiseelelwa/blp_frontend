import React from "react";
import { FaEye, FaTrash, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Messages = () => {
  // PAGINATION

  return (
    <div className="">
      <div className="categories_articles">
        <Link>
          <div className="categorie">
            <div className="icone_categ">
              <FaUserAlt />
            </div>
            <div className="details_categ">
              <p>Messages</p>
              <h6>300</h6>
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
          <Link to="" className="ajoutAgent">
            Nouveau message
          </Link>
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
              <tr>
                <td className="titre">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </td>
                {/*40 caractères*/}
                <td className="categ_article"> Lu</td>
                <td className="auteur">
                  <small>Léon</small>
                </td>
                <td className="actions_articles">
                  <Link>
                    {" "}
                    <FaEye style={{ color: "gray" }} />
                  </Link>
                  <Link>
                    {" "}
                    <FaTrash style={{ color: "red" }} />
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="titre">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </td>
                {/*40 caractères*/}
                <td className="categ_article"> Lu</td>
                <td className="auteur">
                  <small>Léon</small>
                </td>
                <td className="actions_articles">
                  <Link>
                    {" "}
                    <FaEye style={{ color: "gray" }} />
                  </Link>
                  <Link>
                    {" "}
                    <FaTrash style={{ color: "red" }} />
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="titre">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </td>
                {/*40 caractères*/}
                <td className="categ_article"> Non lu</td>
                <td className="auteur">
                  <small>Léon</small>
                </td>
                <td className="actions_articles">
                  <Link>
                    {" "}
                    <FaEye style={{ color: "gray" }} />
                  </Link>
                  <Link>
                    {" "}
                    <FaTrash style={{ color: "red" }} />
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="titre">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </td>
                {/*40 caractères*/}
                <td className="categ_article"> Lu</td>
                <td className="auteur">
                  <small>Léon</small>
                </td>
                <td className="actions_articles">
                  <Link>
                    {" "}
                    <FaEye style={{ color: "gray" }} />
                  </Link>
                  <Link>
                    {" "}
                    <FaTrash style={{ color: "red" }} />
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="titre">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </td>
                {/*40 caractères*/}
                <td className="categ_article"> Non lu</td>
                <td className="auteur">
                  <small>Léon</small>
                </td>
                <td className="actions_articles">
                  <Link>
                    {" "}
                    <FaEye style={{ color: "gray" }} />
                  </Link>
                  <Link>
                    {" "}
                    <FaTrash style={{ color: "red" }} />
                  </Link>
                </td>
              </tr>
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
