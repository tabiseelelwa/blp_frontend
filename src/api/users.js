import axios from "axios";
import { backend } from "../Composants/backend";

export const createUser = async (user) => {
  try {
    const response = await axios.post(`${backend}/api/createUser`, user);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const listUsers = async () => {
  try {
    const response = await axios.get(`${backend}/api/listUsers`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const detailsUser = async (idUser) => {
  try {
    const response = await axios.get(`${backend}/api/detailsUser/${idUser}`);
    return response.data[0];
  } catch (error) {
    console.error(error);
  }
};

export const modifUser = async (idUser, values) => {
  try {
    const response = await axios.put(
      `${backend}/api/modifUser/${idUser}`,
      values
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const supprimUser = async (idUser) => {
  try {
    const response = await axios.delete(`${backend}/api/supprimUser/${idUser}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
