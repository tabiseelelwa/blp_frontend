import axios from "axios";
import { backend } from "../Composants/backend";

// CREATION ABOUT
export const createAbout = async (about) => {
  try {
    const response = await axios.post(`${backend}/api/ajoutApropos`, about);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// RECUPERATION ABOUT
export const listAbout = async () => {
  try {
    const response = await axios.get(`${backend}/api/listApropos`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// MODIFIER ABOUT
export const modifAbout = async (idAbout, values) => {
  try {
    const reponse = await axios.put(
      `${backend}/api/modifApropos/${idAbout}`,
      values
    );
    return reponse.data;
  } catch (error) {}
};
