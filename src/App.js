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

import ClientLayout from "./Layout/ClientLayout";
import AdminLayout from "./Layout/AdminLayout";
import ModifArticle from "./Admin/modif/ModifArticle";
import Connexion from "./Admin/Connexion";
import ModifMdp from "./Admin/modif/ModifMdp";
import Users from "./Admin/Affichage/Users";
import CreatUser from "./Admin/creation/CreatUser";
import ModifUser from "./Admin/modif/ModifUser";
import Messages from "./Admin/Affichage/Messages";
import Parametres from "./Admin/Parametres";
import AccueilAdmin from "./Admin/Accueil";
import DetailsAdmin from "./Admin/Affichage/DetailsAdmin";
import PhotoArticle from "./Admin/modif/PhotoArticle";
import ArticleCreation from "./Admin/creation/articleCreation";
import ProfilUser from "./Admin/modif/ProfilUser";
import CreateAbout from "./Admin/creation/createAbout";
import ModifAbout from "./Admin/modif/ModifAbout";
import AdminListFormation from "./Admin/Affichage/formations";
import CreateFormation from "./Admin/creation/createFormation";
import DetailsFormation from "./Pages/detailsFormation";

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

  // ROUTES DU LOGIN MO,DIFIFCATION DU MOT DE PASSE et DE LA ROUTE 404
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
        path: "article-creation",
        element: <ArticleCreation />,
      },
      {
        path: "modif-article/:idArticle",
        element: <ModifArticle />,
      },
      {
        path: "details-admin/:idArticle",
        element: <DetailsAdmin />,
      },
      {
        path: "list-users",
        element: <Users />,
      },
      {
        path: "formations",
        element: <AdminListFormation />,
      },
      {
        path: "photo-user/:idUser",
        element: <ProfilUser />,
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
        path: "modif-users/:idUser",
        element: <ModifUser />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "photo-article/:idArticle",
        element: <PhotoArticle />,
      },
      {
        path: "about_creat",
        element: <CreateAbout />,
      },
      {
        path: "about_modif",
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
