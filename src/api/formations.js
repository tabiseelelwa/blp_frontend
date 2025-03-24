import axios from "axios";
import { backend } from "../Composants/backend";

// API CREATION D'UNE FORMATION
export const createFormation = async (formation) => {
  try {
    const response = await axios.post(
      `${backend}/api/ajoutFormation`,
      formation
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// API RECUPERATION DE TOUTES LES FORMATIONS
export const listFormations = async () => {
  try {
    const response = await axios.get(`${backend}/api/listFormations`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// API RECUPERATION D'UNE FORMATION
export const detailsFormation = async (idFormation) => {
  try {
    const response = await axios.get(
      `${backend}/api/detailsFormation/${idFormation}`
    );
    return response.data[0];
  } catch (error) {
    console.error(error);
  }
};

// API MODIFICATION D'UNE FORMATION
export const modifFormation = async (idFormation, values) => {
  try {
    const response = await axios.put(
      `${backend}/api/modifFormation/${idFormation}`,
      values,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// API SUPPRESSION D'UNE FORMATION
export const supprimFormation = async (idFormation) => {
  try {
    const response = await axios.delete(
      `${backend}/api/suppFormation/${idFormation}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
