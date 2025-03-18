import axios from "axios";

export const createUser = async (user) => {
  try {
    const response = await axios.post(
      "http://localhost:8085/api/createUser",
      user
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const listUsers = async () => {
  try {
    const response = await axios.get("http://localhost:8085/api/listUsers");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const detailsUser = async (idUser) => {
  try {
    const response = await axios.get(
      `http://localhost:8085/api/detailsUser/${idUser}`
    );
    return response.data[0];
  } catch (error) {
    console.error(error);
  }
};

export const modifUser = async (idAnnonce, values) => {
  try {
    const response = await axios.put(
      `http://localhost:8085/api/modifUser/${idAnnonce}`,
      values
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const supprimUser = async (idUser) => {
  try {
    const response = await axios.delete(
      `http://localhost:8085/api/supprimUser/${idUser}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
