import axios from "axios";
import { backend } from "../Composants/backend";

export const loginConnexion = async (value) => {
  try {
    const response = await axios.post(`${backend}/api/login`, value);
    return response.data;
  } catch (error) {
    console.error("Erreur", error);
    // throw error;
  }
};

export const authentification = async (user) => {
  try {
    const response = await axios.get(`${backend}/api/authentification`, user);
    return response.data;
  } catch (error) {}
};

export const loginDeconnexion = async () => {
  try {
    const response = await axios.get(`${backend}/api/logout`);
    return response.data;
  } catch (error) {}
};
