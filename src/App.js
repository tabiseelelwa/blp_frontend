import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./Styles/App.scss";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Accueil from "./Pages/Accueil";
import Details from "./Pages/Details";
import Formations from "./Pages/Formations";
import About from "./Pages/About";
import Posts from "./Pages/Posts";
import Introuvable from "./Pages/Introuvable";
// import ModifArticle from "./Pages/ModifArticle";

import ClientLayout from "./Layout/ClientLayout";
import AdminLayout from "./Layout/AdminLayout";

import Connexion from "./Admin/Connexion";
import ModifMdp from "./Admin/modif/ModifMdp";
import Users from "./Admin/Affichage/Users";
import CreatUser from "./Admin/creation/CreatUser";
import ModifUser from "./Admin/modif/ModifUser";
import Messages from "./Admin/Affichage/Messages";
import Parametres from "./Admin/Parametres";
import ArticleCreation from "./Admin/creation/articleCreation";
import AccueilAdmin from "./Admin/Accueil";
import CreateAbout from "./Admin/creation/createAbout";
import ModifAbout from "./Admin/modif/ModifAbout";
import AdminListFormation from "./Admin/Affichage/formations";
import CreateFormation from "./Admin/creation/createFormation";
import DetailsFormation from "./Pages/detailsFormation";
import ModifArticle from "./Pages/ModifArticle";
import ModifForm from "./Admin/modif/ModifForm";

const router = createBrowserRouter([
  // ROUTES des visiteurs
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        path: "/",
        element: <Accueil />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/formations",
        element: <Formations />,
      },
      {
        path: "/detailsform/:idFormation",
        element: <DetailsFormation />,
      },
      {
        path: "/a-propos",
        element: <About />,
      },

      {
        path: "/article/:idArticle",
        element: <Details />,
      },
    ],
  },

  // ROUTES DU LOGIN, MODIFIFCATION DU MOT DE PASSE et DE LA PAGE INTROUVABLE (404)
  {
    path: "/login",
    element: <Connexion />,
  },
  {
    path: "/mdofi-pswd",
    element: <ModifMdp />,
  },
  {
    path: "*",
    element: <Introuvable />,
  },

  // ROUTES DE L'ADMINISTRATEUR
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <AccueilAdmin />,
      },
      {
        path: "list-users",
        element: <Users />,
      },
      {
        path: "article-creation",
        element: <ArticleCreation />,
      },
      {
        path: "formations",
        element: <AdminListFormation />,
      },
      {
        path: "create-user",
        element: <CreatUser />,
      },
      {
        path: "create-formation",
        element: <CreateFormation />,
      },
      {
        path: "modif-article/:idArticle",
        element: <ModifArticle />,
      },
      {
        path: "modif-users/:idUser",
        element: <ModifUser />,
      },
      {
        path: "modif-formation/:idFormation",
        element: <ModifForm />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "about_creat",
        element: <CreateAbout />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "about_modif/:idAbout",
        element: <ModifAbout />,
      },
      {
        path: "config",
        element: <Parametres />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <div>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
