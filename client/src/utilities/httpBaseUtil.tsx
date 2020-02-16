import { BASE_URL } from "../apiConfig";
import axios from "axios";

export const httpBaseUtil = () => {
  const API = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    responseType: "json"
  });
  return API;
};
