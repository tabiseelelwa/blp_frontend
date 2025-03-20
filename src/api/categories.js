import axios from "axios";
import { backend } from "../Composants/backend";
export const ajoutCaretgorie = async (values) => {
  try {
    const response = await axios.post(`${backend}/api/ajoutCategorie`, values);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const listCategories = async () => {
  try {
    const reponse = await axios.get(`${backend}/api/listCategories`);
    return reponse.data;
  } catch (error) {
    console.error(error);
  }
};

export const detailsCategorie = async (idCategorie) => {
  try {
    const response = await axios.get(
      `${backend}/api/detailsCategorie/${idCategorie}`
    );
    return response.data[0];
  } catch (error) {
    console.error(error);
  }
};

export const modifCategorie = async (idCategorie, values) => {
  try {
    const response = await axios.put(
      `${backend}/api/modifCategorie/${idCategorie}`,
      values
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const supprCategorie = async (idCategorie) => {
  try {
    const response = await axios.delete(
      `${backend}/api/supprCategorie/${idCategorie}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
