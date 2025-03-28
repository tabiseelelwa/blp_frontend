import axios from "axios";
import { backend } from "../Composants/backend";

export const createMessage = async (message) => {
  try {
    const response = await axios.post(`${backend}/api/postMessage`, message);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const listMessages = async () => {
  try {
    const response = await axios.get(`${backend}/api/getMessages`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const detailsMessage = async (idMessage) => {
  try {
    const response = await axios.get(`${backend}/api/getMesseges/${idMessage}`);
    return response.data[0];
  } catch (error) {
    console.log(error);
  }
};

export const nonReadMessages = async () => {
  try {
    const response = await axios.get(`${backend}/api/getNonReadMessages`);
    return response.data.readMessages;
  } catch (error) {
    console.log(error);
  }
};

export const totalMessages = async () => {
  try {
    const response = await axios.get(`${backend}/api/getTotalMessages`);
    return response.data.totalMessages;
  } catch (error) {
    console.log(error);
  }
};

export const lireMessage = async (idMessage) => {
  try {
    const response = await axios.put(`${backend}/api/lireMessage/${idMessage}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const supprimMessage = async (idMessage) => {
  try {
    const response = await axios.delete(
      `${backend}/api/suppMessage/${idMessage}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
