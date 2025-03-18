import axios from "axios";

// API CREATION D'UNE FORMATION
export const createFormation = async (formation) => {
  try {
    const response = await axios.post(
      "http://localhost:8085/api/ajoutFormation",
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
    const response = await axios.get(
      "http://localhost:8085/api/listFormations"
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// API RECUPERATION D'UNE FORMATION
export const detailsFormation = async (idFormation) => {
  try {
    const response = await axios.get(
      `http://localhost:8085/api/detailsFormation/${idFormation}`
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
      `http://localhost:8085/api/modifFormation/${idFormation}`,
      values
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
      `http://localhost:8085/api/suppFormation/${idFormation}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
