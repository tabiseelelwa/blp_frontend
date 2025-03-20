import axios from "axios";
import { backend } from "../Composants/backend";

// API CREATION D'ARTICLE
export const createArticle = async (article) => {
  try {
    const response = await axios.post(`${backend}/api/ajoutArticle`, article);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// API RECUPERATION DE TOUS LES ARTICLES
export const listArticles = async () => {
  try {
    const response = await axios.get(`${backend}/api/listArticles`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// API RECUPERATION D'UN ARTICLE
export const detailsArticle = async (idArticle) => {
  try {
    const response = await axios.get(
      `${backend}/api/detailsArticle/${idArticle}`
    );
    return response.data[0];
  } catch (error) {
    console.error(error);
  }
};

// API DE COMPTAGE D'ARTICLES
export const nombre_articles = async () => {
  try {
    const response = await axios.get(`${backend}/api/nombre_articles`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// API MODIFICATION D'UN ARTICLE
export const modifArticle = async (idArticle, values) => {
  try {
    const response = await axios.put(
      `${backend}/api/modifArticle/${idArticle}`,
      values
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// API SUPPRESSION D'UN ARTICLE
export const supprimArticle = async (idArticle) => {
  try {
    const response = await axios.delete(
      `${backend}/api/supprArticle/${idArticle}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
